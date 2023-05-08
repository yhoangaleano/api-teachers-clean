import { PrismaClient } from '@prisma/client';
import { Teacher } from '../../domain/entities/Teacher';
import { ITeacherRepository } from '../../domain/interfaces/ITeacherRepository';

export class TeacherRepository implements ITeacherRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(teacher: Teacher): Promise<Teacher> {
    return this.prisma.teacher.create({
      data: { ...teacher },
    });
  }

  async createMany(teachers: Teacher[]): Promise<number> {
    // Crear los profesores usando createMany
    const batchPayload = await this.prisma.teacher.createMany({
      data: teachers.map((teacher) => ({
        name: teacher.name,
        description: teacher.description,
        email: teacher.email,
        birthDate: teacher.birthDate,
      })),
    });

    // Retornar el conteo de profesores creados
    return batchPayload.count;
  }

  async getAll(): Promise<Teacher[]> {
    return this.prisma.teacher.findMany();
  }

  async getById(id: string): Promise<Teacher | null> {
    return this.prisma.teacher.findUnique({ where: { id } });
  }

  async update(id: string, teacher: Teacher): Promise<Teacher | null> {
    return this.prisma.teacher.update({ where: { id }, data: teacher });
  }

  async delete(id: string): Promise<Teacher | null> {
    return this.prisma.teacher.delete({ where: { id } });
  }
}
