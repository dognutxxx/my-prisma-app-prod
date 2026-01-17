const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Prisma App API',
      version: '1.0.0',
      description: 'A simple Express API with Prisma',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the user was added',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the user was last updated',
            },
          },
          example: {
            id: 1,
            email: 'johndoe@example.com',
            name: 'John Doe',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        },
      },
    },
  },
  apis: ['./src/modules/**/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = specs;
