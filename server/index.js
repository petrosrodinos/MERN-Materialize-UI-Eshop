const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const swaggerUI = require("swagger-ui-express");
const { specs } = require("./utils/swagger");
const mongoose = require("mongoose");
require("dotenv").config();
const { deleteUnverifiedUsers } = require("./utils/cleanups");

//deleteUnverifiedUsers();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/verification", verificationRoutes);

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
