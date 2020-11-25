import App from './config/app';
import { readdirSync, Dirent } from 'fs';
import { Config } from './config/config';
import { IRouter } from './config/baseRouter';

export class Server {

  listRouter: IRouter[] = new Array<IRouter>();
  listRouterError: string[] = [];
  app!: App;

  constructor() { }

  private async intializeRouters() {

    let files: string[] = [];
    await readdirSync(__dirname + '/api/', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).forEach((indexDir: Dirent) => {
      let oo = readdirSync(`${__dirname}/api/${indexDir.name}/routers`);
      oo.forEach(element => {
        files.push(`./api/${indexDir.name}/routers/${element}`);
      });
    });

    return new Promise((resolve, _) => {
      
      files.forEach(async (fileName: string) => {
        let dynRouter: string = fileName.replace('.ts', '').replace('.js', '').replace('.map', '');
        try {
          if (dynRouter != 'baseRouter') {
            let classImport = await import(`${dynRouter}`);
            this.listRouter.push(new classImport.default());
            console.log(`[Initiated Router] ${dynRouter}`);
          }
        } catch (error) {
          console.log(error);
          this.listRouterError.push(dynRouter);
        }
      });

      resolve(true);
    });
  }

  initServer() {
    this.intializeRouters().then(() => {
      this.app = new App(
        this.listRouter,
        process.env.PORT || Config.PORT,
      );
      this.app.listen();
    }).catch((err) => {
      console.log('Erro ao iniciar o servidor. Arquivo Server.ts' + err);
    });
  }
}

const server = new Server();
server.initServer();
