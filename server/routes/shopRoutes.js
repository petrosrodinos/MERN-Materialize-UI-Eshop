const express = require("express");
const orderControllers = require("../controllers/orderControllers");
const productControllers = require("../controllers/productControllers");

const { protect } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/orders", protect, orderControllers.getOrders);
router.post("/orders", orderControllers.getOrdersByPhone);
router.post("/orders", protect, orderControllers.createOrder);
router.post("/products", protect, productControllers.createProduct);
router.get("/products", productControllers.getAllProducts);
router.get("/products", protect, productControllers.getProducts);

module.exports = router;
