const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API",
    version: "1.0.0",
    description: "API documentation using Swagger",
  },
  servers: [
    {
      url: "https://backend-fiyc.onrender.com",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;