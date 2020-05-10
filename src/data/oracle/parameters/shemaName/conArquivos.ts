import { OracleParameter, IParameters, ParameterType, Direction } from "../../config/parametersOracle";

export class ConArquivosParameters implements IParameters {

    p_CdMenu?: number = undefined;
    p_TpAcesso: string = '';

    listParameters(): OracleParameter[] {
        let list = new Array<OracleParameter>();
        list.push(new OracleParameter(ParameterType.NUMBER, Direction.BIND_IN, "p_CdMenu", this.p_CdMenu));
        list.push(new OracleParameter(ParameterType.STRING, Direction.BIND_IN, "p_TpAcesso", this.p_TpAcesso));
        return list;
    }
}
