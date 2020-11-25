import OracleDB from "oracledb";
import { Credentials } from "./credentialsOracle";
import { IParameters, OracleParameter, ParameterType, Direction } from "./parametersOracle";

export class OracleDatabase {
  _cred = new Credentials();
  procName: string;
  params!: OracleParameter[];

  conn!: OracleDB.Connection;
  connProm: Promise<void>;

  constructor(procName: string) {
    OracleDB.fetchAsString = [OracleDB.CLOB];
    this.procName = procName;
    this.connProm = OracleDB.getConnection(this._cred.getCredentials())
      .then(async (connection: OracleDB.Connection) => {
        this.conn = connection;
      }).catch((err: any) => {
        console.error(err.message);
        throw err;
      });
  }

  setParameters(params: IParameters) {
    this.params = params.listParameters();
  }

  generateQueryProcedure() {
    let paramsNames: string[] = [];

    if (!this.params) {
      this.params = [];
    }

    // adiciona o "cursor" para retorno da procedure (padrão para todas as procedures):
    this.params.push(new OracleParameter(ParameterType.CURSOR, Direction.BIND_OUT, "cursor"));

    for (let index = 0; index < this.params.length; index++) {
      const element = this.params[index];
      if (element.name) {
        paramsNames.push(`:${element.name}`);
      }
    }

    let query: string = `begin ${this.procName}(${paramsNames.join(",")}); end;`;
    return query;
  }

  generateParametersProcedure() {
    let x: any = {};
    for (let index = 0; index < this.params.length; index++) {
      const element = this.params[index];
      if (element.name) {
        if (element.type == ParameterType.CURSOR) {
          x[element.name] = { dir: element.direction, type: element.type };
        } else {
          x[element.name] = element.value;
        }
      }
    }
    return x;
  }

  executeProcedure(): Promise<{}> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connProm;
        let query = this.generateQueryProcedure();
        let params = this.generateParametersProcedure();

        let start = new Date();
        let resultSet: OracleDB.Result<{}> = await this.conn.execute(query, params, { outFormat: OracleDB.OUT_FORMAT_OBJECT });
        let end = new Date();
        let end2 = end.valueOf() - start.valueOf();

        let result: {} = await this.fetchRowsFromRS(this.conn, (resultSet.outBinds as any).cursor);
        let obj = {
          data: result,
          timeProcedure: end2
        };

        resolve(obj);
      } catch (err) {
        reject(err);
      } finally {
        if (!!this.conn) {
          try {            
            await this.conn.release();
          } catch (error) {
            throw error;
          }
        }
      }     
    });
  }

  fetchRowsFromRS(connection: any, resultSet: any): {} {
    return new Promise((resolve, reject) => {
      let rowsReturn: any = [];
      loop(connection, resultSet);
      function loop(connection: any, resultSet: any) {
        resultSet.getRows(1, (err: any, rows: any) => {
          if (err) {
            reject(err);
          } else if (rows.length === 0) {
            resolve(rowsReturn);
          } else if (rows.length > 0) {
            rowsReturn.push(rows[0]);
            loop(connection, resultSet);
          }
        });
      }
    });
  }
}
