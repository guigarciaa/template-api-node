import { OracleParameter, IParameters, ParameterType, Direction } from "../../config/parametersOracle";

export class ConCardsParameters implements IParameters {

    p_CdMenu?: number = undefined;
    p_TpAcesso: string = '';
    p_CdMatr?: number = undefined;

    listParameters(): OracleParameter[] {
        let list = new Array<OracleParameter>();
        list.push(new OracleParameter(ParameterType.NUMBER, Direction.BIND_IN, "p_CdMenu", this.p_CdMenu));
        list.push(new OracleParameter(ParameterType.STRING, Direction.BIND_IN, "p_TpAcesso", this.p_TpAcesso));
        list.push(new OracleParameter(ParameterType.NUMBER, Direction.BIND_IN, "p_CdMatr", this.p_CdMatr));
        return list;
    }
}
