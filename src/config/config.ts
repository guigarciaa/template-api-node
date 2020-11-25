import { readFileSync } from "fs";

export interface JSONConfig {
    servers: Servers[];
    orapr072: Settings;
    orapr296: Settings;
}

export interface Servers {
    name: string,
    pathWallet: string;
}

export interface Settings {
    connectionString: string;
    externalAuth: boolean;
    securit: string;
    cripto: boolean;
}

export class Config {
    static NAME_APLICATION: string = "/<nameApp>/api";
    static PORT: string = "3000";

    static getServers(): Servers[] {
        return this.getJSONConfig().servers;
    }

    static getJSONConfig(): JSONConfig {
        return <JSONConfig>(JSON.parse(readFileSync(require("path").resolve(__dirname, "../", "oracle-credentials.json"), "utf-8")));
    }
}