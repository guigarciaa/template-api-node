import express from "express";
import BaseController from "./baseController";
import { SchemaServices } from "../services/shemaNameServices";

export class CardController extends BaseController {
  private readonly _service: SchemaServices = new SchemaServices();
  constructor() {
    super();
  }

  getCards = async (req: express.Request, res: express.Response) => {
    try {
      let params = super.getParametersRequest(req);
      let oo = await this._service.ConCards(params.cdmenu, params.tpacesso, params.cdmatr);
      res.status(200).json(oo);
    } catch (err) {
      res
        .status(400)
        .send({ error: { msg: err.message, stack: err.stack, err: err } });
    }
  };

  getCardsCapa = async (req: express.Request, res: express.Response) => {
    try {
      let params = super.getParametersRequest(req);
      let oo = await this._service.ConCardsCapa(params.tpacesso, params.cdmatr);
      res.status(200).json(oo);
    } catch (err) {
      res
        .status(400)
        .send({ error: { msg: err.message, stack: err.stack, err: err } });
    }
  };

  getCardsNovidades = async (req: express.Request, res: express.Response) => {
    try {
      let params = super.getParametersRequest(req);
      let oo = await this._service.ConCardsNovidades(params.tpacesso, params.cdmatr);
      res.status(200).json(oo);
    } catch (err) {
      res
        .status(400)
        .send({ error: { msg: err.message, stack: err.stack, err: err } });
    }
  };

  getPesquisaCard = async (req: express.Request, res: express.Response) => {
    try {
      let params = super.getParametersRequest(req);
      let oo = await this._service.ConPesquisaCard(params.tpacesso, params.cdmatr, params.dstexto);
      res.status(200).json(oo);
    } catch (err) {
      res
        .status(400)
        .send({ error: { msg: err.message, stack: err.stack, err: err } });
    }
  };

  postAtzFavorito = async (req: express.Request, res: express.Response) => {
    try {
        var params = req.body;
      if(params) {
        let oo = await this._service.AtzFavorito(params.cdcard, params.cdmatr);
        res.status(200).json(oo);
      }  else {
        res.status(400).json(`Objeto não passado corretamente!`);
      }
      
    } catch (err) {
      res
        .status(400)
        .send({ error: { msg: err.message, stack: err.stack, err: err } });
    }
  };
}
