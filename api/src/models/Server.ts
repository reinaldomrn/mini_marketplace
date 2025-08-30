import express, {Application} from 'express';
import cors from 'cors'
import productRoutes from "../routes/product.router";
import connectDataBase from '../database/config';

class Server {
  private app: Application;
  private port: string|number;
  private productsPatch:string

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.productsPatch = '/api/products'
    connectDataBase()
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors())
  }

  private routes() {
    this.app.use(this.productsPatch, productRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server runnig in the port number ${process.env.PORT}`);
    });
  }
}

export default Server;