const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${process.env.APP_URL}:${process.env.APP_PORT}`,
      },
      {
        url: `${process.env.APP_URL}`,
      },
      {
        url: `http://localhost:${process.env.APP_PORT}`,
      },
      {
        url: `http://127.0.0.1:${process.env.APP_PORT}`,
      },
      {
        url: `http://127.0.0.1:${process.env.APP_PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/interfaces/routes/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
