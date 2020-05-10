import { OracleParameter, IParameters, ParameterType, Direction } from "../../config/parametersOracle";

export class AtzFavoritoParameters implements IParameters {

    p_CdCard?: number = undefined;
    p_CdMatr?: number = undefined;


    listParameters(): OracleParameter[] {
        let list = new Array<OracleParameter>();
        list.push(new OracleParameter(ParameterType.STRING, Direction.BIND_IN, "p_CdCard", this.p_CdCard));
        list.push(new OracleParameter(ParameterType.STRING, Direction.BIND_IN, "p_CdMatr", this.p_CdMatr));
        return list;
    }
}
