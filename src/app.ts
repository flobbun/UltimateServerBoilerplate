import cors from 'cors';
import express from 'express';
import {connect} from 'mongoose';
import config from './config';
import {logger} from './middlewares/logger.middleware';
import RouterModule from './modules/router.module';
import {LogsService} from './services/logs.service';

class Server {
    app: express.Application = express();

    constructor() {
      this.config();
      this.routes();
      this.start();
    }

    config() {
      this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

        this.app.use(cors());
        next();
      });
      this.app.use(express.json());
    }

    routes() {
      this.app.all('*', logger);
      new RouterModule(this.app);
    }

    start() {
      this.app.listen(config.PORT, this.onServerListening);
      connect(config.MONGODB_URI as string).then(this.onDatabaseConnected).catch((err) => LogsService.log(err, 'error'));
    }

    onDatabaseConnected() {
      LogsService.log('Connected to MongoDB', 'info');
    }

    onServerListening() {
      LogsService.log(`Listening on port ${config.PORT}`, 'info');
    }
}

const server = new Server();
export {server as Server};
