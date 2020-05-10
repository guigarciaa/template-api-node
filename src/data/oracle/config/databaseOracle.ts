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
    let context = this;
    return new Promise(async function (resolve, reject) {
      try {
        await context.connProm;
        let query = context.generateQueryProcedure();
        let params = context.generateParametersProcedure();

        let start = new Date();
        let resultSet: OracleDB.Result<{}> = await context.conn.execute(query, params, { outFormat: OracleDB.DB_TYPE_OBJECT });
        let end = new Date();
        let end2 = end.valueOf() - start.valueOf();

        let result: {} = await context.fetchRowsFromRS(context.conn, (resultSet.outBinds as any).cursor);
        let obj = {
          data: result,
          timeProcedure: end2
        };

        resolve(obj);
      } catch (err) {
        reject(err);
      }
      if (context.conn) context.conn.release();
    });
  }

  fetchRowsFromRS(connection: any, resultSet: any): {} {
    let coluns = resultSet.metaData;
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
            let row = rows[0];
            let obj = {}
            for (let index = 0; index < coluns.length; index++) {
              const element = coluns[index];
              obj[element.name] = row[index];
            }
            rowsReturn.push(obj);
            loop(connection, resultSet);
          }
        });
      }
    });
  }
}
