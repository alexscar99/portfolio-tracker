import express from 'express';

export class App {
  private app: express.Application;
  private port: number;

  constructor(appInit: { port: number; middlewares: any; controllers: any }) {
    // initialize express app
    this.app = express();

    // set fields to appInit object
    this.port = appInit.port;
    this.middlewares(appInit.middlewares);
    this.routes(appInit.controllers);
  }

  private middlewares(middlewares: { forEach: (arg: (middleware: any) => void) => void }) {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private routes(controllers: { forEach: (arg: (controller: any) => void) => void }) {
    controllers.forEach((controller) => {
      this.app.use(controller.route, controller.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () =>
      // tslint:disable-next-line:no-console
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${this.port}`)
    );
  }
}
