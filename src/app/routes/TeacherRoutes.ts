import { Router } from 'express';
import { TeacherRepository } from '../../infra/repositories/TeacherRepository';
import { TeacherController } from '../controllers/TeacherController';

export class TeacherRoutes {
  private router: Router;
  private teacherRepository: TeacherRepository;
  private teacherController: TeacherController;

  constructor() {
    this.router = Router();
    this.teacherRepository = new TeacherRepository();
    this.teacherController = new TeacherController(this.teacherRepository);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post('/', this.teacherController.create.bind(this.teacherController));
    this.router.post('/bulk', this.teacherController.createMany.bind(this.teacherController));
    this.router.get('/', this.teacherController.getAll.bind(this.teacherController));
    this.router.get('/:id', this.teacherController.getById.bind(this.teacherController));
    this.router.put('/:id', this.teacherController.update.bind(this.teacherController));
    this.router.delete('/:id', this.teacherController.delete.bind(this.teacherController));
  }

  public getRoutes(): Router {
    return this.router;
  }
}
