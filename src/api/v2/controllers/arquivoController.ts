import express from "express";
import BaseController from "./baseController";
import { SchemaServices } from "../services/shemaNameServices";

export class ArquivoController extends BaseController {
  private readonly _service: SchemaServices = new SchemaServices();
  constructor() {
    super();
  }

  getArquivo = async (req: express.Request, res: express.Response) => {
    try {
      let params = super.getParametersRequest(req);
      let oo = await this._service.ConArquivos(params.tpacesso, params.cdmenu);
      res.status(200).json(oo);
    } catch (err) {
      res.status(400).send({ error: { msg: err.message, stack: err.stack, err: err } });
    }
  };


}
