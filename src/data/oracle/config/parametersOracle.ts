export class OracleParameter {
  constructor(
    type: ParameterType,
    direction: Direction,
    name: string,
    value?: any
  ) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.direction = direction;
  }
  public value?: any;
  public name: string;
  public type: ParameterType;
  public direction: Direction;
}

export enum ParameterType {
  BLOB = 2019,
  BUFFER = 2005,
  CLOB = 2017,
  CURSOR = 2021,
  DATE = 2014,
  DEFAULT = 0,
  NUMBER = 2010,
  NCLOB = 2018,
  STRING = 2001
}

export enum Direction {
  BIND_IN = 3001,
  BIND_INOUT = 3002,
  BIND_OUT = 3003
}

export interface IParameters {
  listParameters(): OracleParameter[];
}

export class ListParameters implements IParameters {
  parameters: OracleParameter[];
  constructor() {
    this.parameters = [];
  }

  pushParameter(parameter: OracleParameter) {
    this.parameters.push(parameter);
  }

  listParameters(): OracleParameter[] {
    return this.parameters;
  }
}


