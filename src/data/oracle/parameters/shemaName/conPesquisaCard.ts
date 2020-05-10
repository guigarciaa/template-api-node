import { OracleParameter, IParameters, ParameterType, Direction } from "../../config/parametersOracle";

export class ConPesquisaCardParameters implements IParameters {

    p_TpAcesso: string = '';
    p_CdMatr?: number = undefined;
    p_DsTexto : string = '';

    listParameters(): OracleParameter[] {
        let list = new Array<OracleParameter>();
        list.push(new OracleParameter(ParameterType.STRING, Direction.BIND_IN, "p_TpAcesso", this.p_TpAcesso));
        list.push(new OracleParameter(ParameterType.NUMBER, Direction.BIND_IN, "p_CdMatr", this.p_CdMatr));
        list.push(new OracleParameter(ParameterType.STRING, Direction.BIND_IN, "p_DsTexto", this.p_DsTexto));
        return list;
    }
}
