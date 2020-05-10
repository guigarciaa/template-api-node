import express, { Router } from "express";
import { ArquivoController } from "../controllers/arquivoController";
import { BaseRouter, IRouter } from "../../../config/baseRouter";

export default class ArquivoRouter extends BaseRouter implements IRouter {
    private _path = this.getBaseRouterAPI(require('path').resolve(__dirname, '..')) + "arquivo";
    private _ctrl = new ArquivoController();

    intializeRoutes(): Router {
        let _router = express.Router();
        _router.get(`${this._path}`, this._ctrl.getArquivo);
        return _router;
    }
}