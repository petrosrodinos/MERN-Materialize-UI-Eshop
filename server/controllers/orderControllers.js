require("dotenv").config();
const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const stripe = require("stripe")(process.env.STRIPE_KEY);

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

const orderCheckout = async (req, res, next) => {
  const { products } = req.body;
  let orderProducts;
  let productsForStripe;

  try {
    orderProducts = await Product.find({ _id: { $in: products } });

    productsForStripe = orderProducts.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: "good phone",
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      };
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: productsForStripe,
      success_url: `${process.env.CLIENT_URL}Order-Message?success=true`,
      cancel_url: `${process.env.CLIENT_URL}Order-Message?success=false`,
    });

    res.json({ message: "OK", url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
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

  return res.json({ message: "OK" });
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
  orderCheckout,
};
