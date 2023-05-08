import { Options, SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'TypeScript Teacher API',
    description: 'API to manage teachers',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
};

const swaggerOptions: Options = {
  swaggerDefinition,
  apis: ['./src/app/routes/*.ts', './src/app/controllers/*.ts', './src/domain/entities/*.ts'],
};

export default swaggerOptions;
