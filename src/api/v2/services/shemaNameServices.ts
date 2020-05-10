import { RepositoryOracle } from "../../../data/oracle/config/repositoryOracle";
import { ShemaPackage } from "../../../data/oracle/package/shemaNemaPackagePackageName";
import { 
    ConMenuParameters,
    ConCardsParameters,
    ConArquivosParameters,
    ConCardsCapaParameters,
    ConCardsNovidadesParameters,
    AtzFavoritoParameters,
    //ConFAQParameters,
    ConPesquisaCardParameters
} from "../../../data/oracle/parameters/shemaName/exports";

export class SchemaServices {

    async conMenu(p_TpAcesso: string) {
        let params: ConMenuParameters = new ConMenuParameters();
        params.p_TpAcesso = p_TpAcesso;
        let db = RepositoryOracle.getInstance().procedureReturn(ShemaPackage.ConMenu, params);
        return await db;
    }

    async ConCards(p_CdMenu: number, p_TpAcesso: string, p_CdMatr: number) {
        let params: ConCardsParameters = new ConCardsParameters();
        params.p_TpAcesso = p_TpAcesso;
        params.p_CdMenu = p_CdMenu;
        params.p_CdMatr = p_CdMatr
        let db = RepositoryOracle.getInstance().procedureReturn(ShemaPackage.ConCards, params);
        return await db;
    }

    async ConArquivos(p_TpAcesso: string, p_CdMenu: number) {
        let params: ConArquivosParameters = new ConCardsParameters();
        params.p_TpAcesso = p_TpAcesso;
        params.p_CdMenu = p_CdMenu;
        let db = RepositoryOracle.getInstance().procedureReturn(ShemaPackage.ConArquivos, params);
        return await db;
    }

    async ConCardsCapa(p_TpAcesso: string, p_CdMatr: number) {
        let params: ConCardsCapaParameters = new ConCardsCapaParameters();
        params.p_TpAcesso = p_TpAcesso;
        params.p_CdMatr = p_CdMatr;
        let db = RepositoryOracle.getInstance().procedureReturn(ShemaPackage.ConCardsCapa, params);
        return await db;
    }

    async ConCardsNovidades(p_TpAcesso: string, p_CdMatr: number) {
        let params: ConCardsNovidadesParameters = new ConCardsNovidadesParameters();
        params.p_TpAcesso = p_TpAcesso;
        params.p_CdMatr = p_CdMatr;
        let db = RepositoryOracle.getInstance().procedureReturn(ShemaPackage.ConCardsNovidades, params);
        return await db;
    }

    async AtzFavorito(p_CdCard: number, p_CdMatr: number) {
        let params: AtzFavoritoParameters = new AtzFavoritoParameters();
        params.p_CdCard = p_CdCard;
        params.p_CdMatr = p_CdMatr;
        let db = RepositoryOracle.getInstance().procedureReturn(ShemaPackage.AtzFavorito, params);
        return await db;
    }

    async ConFAQ() {;
        let db = RepositoryOracle.getInstance().procedureReturn(ShemaPackage.ConFAQ);
        return await db;
    }

    async ConPesquisaCard(p_TpAcesso: string, p_CdMatr: number, p_DsTexto: string) {
        let params: ConPesquisaCardParameters = new ConPesquisaCardParameters();
        params.p_TpAcesso = p_TpAcesso;
        params.p_CdMatr = p_CdMatr;
        params.p_DsTexto = p_DsTexto;
        let db = RepositoryOracle.getInstance().procedureReturn(ShemaPackage.ConPesquisaCard, params);
        return await db;
    }
}