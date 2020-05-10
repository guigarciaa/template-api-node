import express, { Router } from "express";
import { CardController } from "../controllers/cardController";
import { BaseRouter, IRouter } from "../../../config/baseRouter";

export default class CardRouter extends BaseRouter implements IRouter {
    private _path = this.getBaseRouterAPI(require('path').resolve(__dirname, '..')) + "cards";
    private _ctrl = new CardController();

    intializeRoutes(): Router {
        let _router = express.Router();
        _router.get(`${this._path}`, this._ctrl.getCards);
        _router.get(`${this._path}/capa`, this._ctrl.getCardsCapa);
        _router.get(`${this._path}/novidades`, this._ctrl.getCardsNovidades);
        _router.get(`${this._path}/pesquisa`, this._ctrl.getPesquisaCard);
        _router.post(`${this._path}/favoritar`, this._ctrl.postAtzFavorito)
        return _router;
    }
}