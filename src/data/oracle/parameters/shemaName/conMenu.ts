import { OracleParameter, IParameters, ParameterType, Direction } from "../../config/parametersOracle";

export class ConMenuParameters implements IParameters {

    p_TpAcesso: string = '';

    listParameters(): OracleParameter[] {
        let list = new Array<OracleParameter>();
        list.push(new OracleParameter(ParameterType.STRING, Direction.BIND_IN, "p_TpAcesso", this.p_TpAcesso));
        return list;
    }
}
