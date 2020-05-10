import express from "express";
import BaseController from "./baseController";
import { SchemaServices } from "../services/shemaNameServices";

export class MenuController extends BaseController {
  //private _migracaoModel = new ExampleModel();
  private readonly _service: SchemaServices = new SchemaServices();
  constructor() {
    super();
  }

  getMenu = async (req: express.Request, res: express.Response) => {
    try {
      let params = super.getParametersRequest(req);
      let oo = await this._service.conMenu(params.tpacesso);
      res.status(200).json(oo);
    } catch (err) {
      res.status(400).send({ error: { msg: err.message, stack: err.stack, err: err } });
    }
  };

  getFAQ = async (_: express.Request, res: express.Response) => {
    try {
      // let params = super.getParametersRequest(req);
      let oo = await this._service.ConFAQ();
      res.status(200).json(oo);
    } catch (err) {
      res.status(400).send({ error: { msg: err.message, stack: err.stack, err: err } });
    }
  };
}
