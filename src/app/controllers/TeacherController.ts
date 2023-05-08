import { Request, Response } from 'express';
import { Teacher } from '../../domain/entities/Teacher';
import { ITeacherRepository } from '../../domain/interfaces/ITeacherRepository';

export class TeacherController {
  constructor(private teacherRepository: ITeacherRepository) {}

  /**
   * @openapi
   * /teachers:
   *   post:
   *     tags:
   *       - Teachers
   *     summary: Crea un profesor
   *     description: Crea un profesor y lo guarda en la base de datos
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewTeacher'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Teacher'
   *       400:
   *         description: Datos inválidos
   */
  async create(req: Request, res: Response): Promise<Response> {
    const { name, description, email, birthDate } = req.body;
    const teacher = new Teacher(name, description, email, new Date(birthDate));
    const createdTeacher = await this.teacherRepository.create(teacher);
    return res.status(201).json(createdTeacher);
  }

  /**
   * @openapi
   * /teachers/bulk:
   *   post:
   *     tags:
   *       - Teachers
   *     summary: Crea varios profesores
   *     description: Crea varios profesores y los guarda en la base de datos
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: array
   *             items:
   *               $ref: '#/components/schemas/NewTeacher'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 count:
   *                   type: integer
   *                   description: Número de profesores creados exitosamente
   *       400:
   *         description: Datos inválidos
   */
  async createMany(req: Request, res: Response): Promise<Response> {
    const teachers = req.body.map((teacher: Teacher) => {
      const { name, description, email, birthDate } = teacher;
      return new Teacher(name, description, email, new Date(birthDate));
    });
    const createdTeachers = await this.teacherRepository.createMany(teachers);
    return res.status(201).json({ count: createdTeachers });
  }

  /**
   * @openapi
   * /teachers:
   *   get:
   *     tags:
   *       - Teachers
   *     summary: Obtiene todos los profesores
   *     description: Obtiene una lista de todos los profesores almacenados en la base de datos
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Teacher'
   *       500:
   *         description: Error interno del servidor
   */
  async getAll(req: Request, res: Response) {
    const teachers = await this.teacherRepository.getAll();
    res.json(teachers);
  }

  /**
   * @openapi
   * /teachers/{id}:
   *   get:
   *     tags:
   *       - Teachers
   *     summary: Obtiene un profesor por ID
   *     description: Retorna un profesor según su ID único
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Teacher'
   *       404:
   *         description: Profesor no encontrado
   */
  async getById(req: Request, res: Response) {
    const id = req.params.id;
    const teacher = await this.teacherRepository.getById(id);
    if (!teacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      res.json(teacher);
    }
  }

  /**
   * @openapi
   * /teachers/{id}:
   *   put:
   *     tags:
   *       - Teachers
   *     summary: Actualiza un profesor por ID
   *     description: Actualiza la información de un profesor según su ID único
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Teacher'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Teacher'
   *       404:
   *         description: Profesor no encontrado
   */
  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { name, description, email, birthDate } = req.body;
    const teacher = new Teacher(name, description, email, new Date(birthDate), id);
    const updatedTeacher = await this.teacherRepository.update(id, teacher);
    if (!updatedTeacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      res.json(updatedTeacher);
    }
  }

  /**
   * @openapi
   * /teachers/{id}:
   *   delete:
   *     tags:
   *       - Teachers
   *     summary: Elimina un profesor por ID
   *     description: Elimina un profesor según su ID único
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Teacher'
   *       404:
   *         description: Profesor no encontrado
   */
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const deletedTeacher = await this.teacherRepository.delete(id);
    if (!deletedTeacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      res.json(deletedTeacher);
    }
  }
}
