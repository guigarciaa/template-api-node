import express from "express";
import cors from "cors";
import { Config } from "./config";
import { IRouter } from "./baseRouter";


export default class App {
  public app: express.Application;
  public port: string;

  constructor(routers: IRouter[], port: string) {
    this.app = express();
    this.port = port;

    let corsOptions = {
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true
    };
    this.app.use(cors(corsOptions));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.initializeRouters(routers);
  }

  private initializeRouters(router: IRouter[]) {
    router.forEach((indexRouter: IRouter) => {
      this.app.use("/", indexRouter.intializeRoutes());
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`API escutando na porta ${this.port} url: http://localhost:${this.port + Config.NAME_APLICATION}`);
    });
  }
}
