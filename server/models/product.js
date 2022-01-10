const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    shopId: { type: mongoose.Types.ObjectId, ref: "User" },
    name: { type: String },
    price: { type: String },
    description: { type: String },
    photo: { type: String },
  },
  { timestamps: { createdAt: true } }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
