export class Materialize {
    static deserialize<T>(source: new () => T, input: any): T {
        let inputObj: any;
        let instance = new source();

        // valida se o valor na variavel input é do tipo Array, se for, pega apenas a primeira posição:
        if (input instanceof Array) {
            inputObj = input[0];
        } else {
            if (typeof input === "string") {
                inputObj = JSON.parse(input);
            } else {
                inputObj = input;
            }
        }

        for (const key in inputObj) {
            let objName = Object.keys(instance).filter(
                e => e.toLowerCase() == key.toLowerCase()
            );
            if (objName.length) {
                if (instance[objName[0]] instanceof Date) {
                    instance[objName[0]] = new Date(inputObj[key]);
                } else {
                    instance[objName[0]] = inputObj[key];
                }
            }
        }
        return instance;
    }

    static deserializeList<T>(source: new () => T, input: any[]): T[] {
        const output: any[] = [];
        for (let i = 0, max = input.length; i < max; i++) {
            let result = this.deserialize(source, input[i]);
            output.push(result);
        }
        return output;
    }

    static serialize<T>(source: T): string {
        let tmpObj: any = {};
        for (const key in source) {
            if (key[0] !== "_") {
                tmpObj[key] = source[key];
            }
        }
        return JSON.stringify(tmpObj);
    }
}
