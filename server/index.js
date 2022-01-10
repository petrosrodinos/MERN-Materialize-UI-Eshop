const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
var path = require("path");
const mongoose = require("mongoose");
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
  apis: [path.join(__dirname, "./swagger-config/*.yaml")],
};

const specs = swaggerJsDoc(options);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/shop", shopRoutes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use((req, res, next) => {
  return res.status(404).json({ message: "Could not find this route" });
});

PORT = process.env.PORT;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Listening...");
    });
  })
  .catch((error) => {
    return res.status(404).json({ message: "Could not start server" });
  });
