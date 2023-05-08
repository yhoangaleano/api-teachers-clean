import express from 'express';
import corsMiddleware from './app/middlewares/cors';
import loggerHttp from './app/middlewares/logger-http';
import swaggerRouter from './app/middlewares/swagger/swagger';
import { TeacherRoutes } from './app/routes/TeacherRoutes';
import config from './config';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.routes();
  }

  private config() {
    this.app.set('port', process.env.PORT || 3000);
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(corsMiddleware);
    this.app.use(loggerHttp);
    this.app.use('/api-docs', swaggerRouter);
  }

  private routes() {
    const teacherRoutes = new TeacherRoutes();
    this.app.use('/api/teachers', teacherRoutes.getRoutes());
  }

  public start() {
    this.app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  }
}

export default Server;
