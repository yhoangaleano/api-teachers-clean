/**
 * @openapi
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del profesor
 *         name:
 *           type: string
 *           description: Nombre del profesor
 *         description:
 *           type: string
 *           nullable: true
 *           description: Descripción del profesor
 *         email:
 *           type: string
 *           description: Correo electrónico del profesor
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del profesor
 *       required:
 *         - name
 *         - email
 *         - birthDate
 *     NewTeacher:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del profesor
 *         description:
 *           type: string
 *           nullable: true
 *           description: Descripción del profesor
 *         email:
 *           type: string
 *           description: Correo electrónico del profesor
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del profesor
 *       required:
 *         - name
 *         - email
 *         - birthDate
 */
export class Teacher {
  constructor(
    public name: string,
    public description: string | null,
    public email: string,
    public birthDate: Date,
    public id?: string
  ) {}
}
