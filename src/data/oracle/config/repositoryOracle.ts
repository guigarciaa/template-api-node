import { OracleDatabase } from "./databaseOracle";
import { IParameters } from "./parametersOracle";

export class RepositoryOracle {
  private static instance: RepositoryOracle;

  private constructor() { }

  async procedureReturn(procName: string, parameters?: IParameters): Promise<{}> {
    let _conn = new OracleDatabase(procName);
    if (parameters) {
      _conn.setParameters(parameters);
    }
    return await _conn.executeProcedure();
  }

  static getInstance(): RepositoryOracle {
    if (!RepositoryOracle.instance) {
      RepositoryOracle.instance = new RepositoryOracle();
    }
    return RepositoryOracle.instance;
  }

}