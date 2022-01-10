const Order = require("../models/order");
const User = require("../models/user");

const getOrders = async (req, res, next) => {
  const userId = req.userId;
  const { shopOrders } = req.query;
  let orders;
  let search = { userId: userId };
  let populate = "products";
  let sub = "-updatedAt -shopId -userId";
  if (shopOrders === "true") {
    console.log(shopOrders);
    search = { shopId: userId };
    populate = "products userId";
    sub = " -updatedAt -shopId";
  }

  try {
    orders = await Order.find(search, sub).populate(
      populate,
      "-updatedAt -shopId -password"
    );
  } catch (error) {
    console.log(error);
    return res.json({ message: "error fetching user orders" });
  }

  return res.status(200).json({
    message: "OK",
    orders: orders,
  });
};

const createOrder = async (req, res, next) => {
  let newOrder;
  const { products, shopId, total } = req.body;
  const userId = req.userId;

  try {
    newOrder = await Order.create({ userId, products, shopId, total });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error creating order", status: "500" });
  }

  return res.json({ message: "OK", order: newOrder });
};

const getOrdersByPhone = async (req, res, next) => {
  const { shopId, phone } = req.body;
  let user;
  let orders;

  try {
    user = await User.findOne({ phone: phone });
    orders = await Order.find({
      userId: user._id,
      shopId: shopId,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching order", status: "500" });
  }
  res.status(201).json({ message: "OK", orders: orders });
};

module.exports = {
  getOrders,
  createOrder,
  getOrdersByPhone,
};
