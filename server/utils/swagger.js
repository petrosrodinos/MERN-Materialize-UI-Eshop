const swaggerJsDoc = require("swagger-jsdoc");
var path = require("path");
require("dotenv").config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Eshop API",
      version: "1.0.0",
      description: "Simple eshop project API,tp5006",
    },
    servers: [
      {
        url: process.env.PRODUCTION_URL,
      },
    ],
  },
  apis: [path.join(__dirname, "../swagger/*.yaml")],
};

module.exports.specs = swaggerJsDoc(options);
