const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  shopId: { type: mongoose.Types.ObjectId, ref: "User" },
  products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  total: { type: String },
  createdAt: { type: String, default: new Date() },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
