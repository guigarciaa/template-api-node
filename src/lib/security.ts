import CryptoJS, { WordArray, DecryptedMessage } from "crypto-js";
import { Materialize } from "./materialize";

export class Security {
    // DADOS_CRIPTOGRAFAR = {
    //   algoritmo: "aes256",
    //   codificacao: "utf8",
    //   segredo: "chaves",
    //   tipo: "hex"
    // };

    encrypt(message: string, key: string) {
        let ciphertext: WordArray = CryptoJS.AES.encrypt(message, key);
        return ciphertext.toString();
    }

    descriptografar<T>(source: new () => T, message: string, key: string): T {
        let bytes: DecryptedMessage = CryptoJS.AES.decrypt(message, key);
        let plainText: string = bytes.toString(CryptoJS.enc.Utf8);

        return Materialize.deserialize(source, plainText);
    };
}


