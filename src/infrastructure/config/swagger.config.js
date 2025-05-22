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
    ],
  },
  apis: ["./src/interface/routes/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
