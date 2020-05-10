import { Config } from "./config";
import { Router } from "express";

export class BaseRouter {
    getBaseRouterAPI(dirNameVersion: string): string {
        //let dirNameVersion: string = require('path').resolve(__dirname);
        let segments: string[] = dirNameVersion.split('\\');
        return Config.NAME_APLICATION + segments[segments.length - 1] + '/';
    };
}

export interface IRouter {
    intializeRoutes(): Router;
}