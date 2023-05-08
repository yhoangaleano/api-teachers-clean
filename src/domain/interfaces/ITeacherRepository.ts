import { Teacher } from '../entities/Teacher';

export interface ITeacherRepository {
  create(teacher: Teacher): Promise<Teacher>;
  createMany(teachers: Teacher[]): Promise<number>;
  getAll(): Promise<Teacher[]>;
  getById(id: string): Promise<Teacher | null>;
  update(id: string, teacher: Teacher): Promise<Teacher | null>;
  delete(id: string): Promise<Teacher | null>;
}
