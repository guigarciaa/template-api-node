import { Config } from "./config";
import { Router } from "express";

export class BaseRouter {
    gerBaseRouterAPI(dirNameVersion: string): string {
        const segments: string[] = dirNameVersion.split('\\');
        return Config.NAME_APLICATION + segments[segments.length - 1] + '/';
    }
}

export interface IRouter {
    initializeRouters(): Router;
}