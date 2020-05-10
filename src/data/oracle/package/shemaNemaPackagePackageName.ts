export class ShemaPackage {
    private static _schemaName: string = "-.";
    private static _package: string = "-.";

    private static readonly _sp_ConMenu: string = 'sp_ConMenu';
    static get ConMenu(): string {
        return this._schemaName + this._package + this._sp_ConMenu;
    }

    private static readonly _sp_ConCards: string = 'sp_ConCards';
    static get ConCards(): string {
        return this._schemaName + this._package + this._sp_ConCards;
    }

    private static readonly _sp_ConArquivos: string = 'sp_ConArquivos';
    static get ConArquivos(): string {
        return this._schemaName + this._package + this._sp_ConArquivos;
    }

    private static readonly _sp_ConCardsCapa: string = 'sp_ConCardsCapa';
    static get ConCardsCapa(): string {
        return this._schemaName + this._package + this._sp_ConCardsCapa;
    }

    private static readonly _sp_ConCardsNovidades: string = 'sp_ConCardsNovidades';
    static get ConCardsNovidades(): string {
        return this._schemaName + this._package + this._sp_ConCardsNovidades;
    }

    private static readonly _sp_AtzFavorito: string = 'sp_AtzFavorito';
    static get AtzFavorito(): string {
        return this._schemaName + this._package + this._sp_AtzFavorito;
    }

    private static readonly _sp_ConFAQ: string = 'sp_ConFAQ';
    static get ConFAQ(): string {
        return this._schemaName + this._package + this._sp_ConFAQ;
    }

    private static readonly _sp_ConPesquisaCard: string = 'sp_ConPesquisaCard';
    static get ConPesquisaCard(): string {
        return this._schemaName + this._package + this._sp_ConPesquisaCard;
    }

}
