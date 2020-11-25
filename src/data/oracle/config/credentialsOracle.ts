import { Security } from "../../../lib/security";
import os from "os";
import { Materialize } from "../../../lib/materialize";
import { Servers, Settings, Config } from "../../../config/config";

export class OracleCredentialsExternal {
  connectString: string = '';
  externalAuth: boolean = false;
}

export class OracleCredentials {
  user: string = '';
  password: string = '';
  connectString: string = '';
  externalAuth: boolean = false;
}

let _oracleCredentials: OracleCredentials | OracleCredentialsExternal;

export class Credentials {
  constructor() {
    //this.encryptJson();
    _oracleCredentials = this._getCredentialsJSON();
  }

  private _getCredentialsJSON(): OracleCredentials | OracleCredentialsExternal {
    let config = Config.getJSONConfig()
    if (!_oracleCredentials) {
      if (this.isHomolog(config.servers)) {
        _oracleCredentials = this.credentialsDescrip(config.orapr072);
      } else {
        _oracleCredentials = this.credentialsDescrip(config.orapr296);
      }
    }
    return _oracleCredentials;
  }

  // private encryptJson(): void {
  //   let security = new Security();
  //   let file = readFileSync(require('path').resolve(__dirname, '../../../../oracle-credentials-encrypt.json'), 'utf8');
  //   console.log(security.encrypt(file, 'misvarejo'));
  // }

  private isHomolog(list: Servers[]): boolean {
    if (list.find(x => x.name.toLocaleLowerCase() == os.hostname().toLowerCase())) {
      return true;
    }
    return false;
  }

  private credentialsDescrip(settings: Settings): OracleCredentials | OracleCredentialsExternal {
    if (!settings.cripto) {
      return Materialize.deserialize(OracleCredentialsExternal, settings);
    } else {
      const security = new Security();
      return security.descriptografar(
        OracleCredentials,
        settings.connectionString,
        settings.securit
      );
    }
  }


  public getCredentials() {
    return _oracleCredentials;
  }
}
