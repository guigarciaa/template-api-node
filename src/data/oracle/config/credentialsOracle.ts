import { Security } from "../../../lib/security";
import { readFileSync } from 'fs';
import { Materialize } from "../../../lib/materialize";

export class OracleCredentialsJSON {
  credentials: string = '';
  key: string = '';
}

export class OracleCredentials {
  user: string = '';
  password: string = '';
  connectString: string = '';
}

let _oracleCredentials: OracleCredentials;

export class Credentials {
  // private _user: string = "MIS_VAREJO";
  // private _password: string = "misvarejopwd01";
  // private _connectString072: string = "(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=clup2-scan.santanderbr.corp)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=sby072)))";
  // private _connectString296: string = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=***)(PORT=***))(FAILOVER=on)(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=***)(FAILOVER_MODE=(TYPE=SELECT)(METHOD=BASIC))))";

  constructor() {
    //this.encryptJson();
    _oracleCredentials = this._getCredentialsJSON();
  }

  private _getCredentialsJSON(): OracleCredentials {
    if (!_oracleCredentials) {
      let security = new Security();
      let file = readFileSync(require('path').resolve(__dirname, '../../../oracle-credentials.json'), 'utf8');
      let oracleCredentialsJSON = Materialize.deserialize(OracleCredentialsJSON, file);
      _oracleCredentials = security.descriptografar(OracleCredentials, oracleCredentialsJSON.credentials, 'misvarejo');
    }
    return _oracleCredentials;
  }

  // private encryptJson(): void {
  //   let security = new Security();
  //   let file = readFileSync(require('path').resolve(__dirname, '../../../../oracle-credentials-encrypt.json'), 'utf8');
  //   console.log(security.encrypt(file, 'misvarejo'));
  // }

  get user() {
    return _oracleCredentials.user;
  }
  get password() {
    return _oracleCredentials.password;
  }
  get connectionString072() {
    return _oracleCredentials.connectString;
  }
  get connectionString296() {
    return _oracleCredentials.connectString;
  }

  public getCredentials() {
    return {
      user: _oracleCredentials.user,
      password: _oracleCredentials.password,
      connectString: _oracleCredentials.connectString
      //tag: this._sessionTag
    };
  }
}
