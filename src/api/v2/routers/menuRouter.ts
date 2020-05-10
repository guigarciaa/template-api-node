import express, { Router } from "express";
import { MenuController } from "../controllers/menuController";
import { BaseRouter, IRouter } from "../../../config/baseRouter";

export default class MenuRouter extends BaseRouter implements IRouter {
    private _path = this.getBaseRouterAPI(require('path').resolve(__dirname, '..')) + "menu";
    private _ctrl = new MenuController();

    intializeRoutes(): Router {
        let _router = express.Router();
        _router.get(`${this._path}`, this._ctrl.getMenu);
        _router.get(`${this._path}/faq`, this._ctrl.getFAQ);
        return _router;
    }
}