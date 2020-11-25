import express from "express";
import cors from "cors";
import { Config } from "./config";
import { IRouter } from "./baseRouter";
import formData from "express-form-data";

export default class App {
    public app: express.Application;
    public port: string

    constructor(routers: IRouter[], port: string) {
        this.app = express();
        this.port = port;

        const corsOptions = {
            origin: true,
            optionSucessStatus: 200,
            credentials: true
        }
        this.app.use(cors(corsOptions));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(formData.parse({ autoClean: true }));
        this.app.use(formData.unior());

        this.initializeRouters(routers);
    }

    private initializeRouters(routers: IRouter[]): void {
        routers.forEach((indexRouter: IRouter) => {
            this.app.use("/", indexRouter.initializeRouters());
        });
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`API active in port ${this.port} url: http://localhost:${this.port + Config.NAME_APLICATION}`)
        });
    }
}