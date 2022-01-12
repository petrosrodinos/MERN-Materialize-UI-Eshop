const Product = require("../models/product");

const createProduct = async (req, res, next) => {
  const userId = req.userId;
  console.log(userId);
  const newProduct = new Product({
    price: req.body.price,
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
    shopId: userId,
  });
  try {
    await newProduct.save();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error creating product", status: "500" });
  }

  return res.json({ message: "OK", product: newProduct });
};

const getProducts = async (req, res, next) => {
  let products;
  const userId = req.params.id;
  // const userId = req.userId;

  try {
    products = await Product.find(
      { shopId: userId },
      "-_id -shopId -updatedAt"
    );
  } catch (error) {
    return res.json({ message: "error fetching products" });
  }

  return res.json({ message: "OK", products: products });
};

const getAllProducts = async (req, res, next) => {
  const { pageNumber, perPage } = req.query;

  const productQuery = Product.find({}, "-createdAt -updatedAt");

  let products;
  if (perPage && pageNumber) {
    productQuery.skip(perPage * (pageNumber - 1)).limit(perPage);
  }
  productQuery
    .then((data) => {
      products = data;
      return Product.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "OK",
        products: products,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching products failed!",
      });
    });
};

module.exports = {
  createProduct,
  getProducts,
  getAllProducts,
};
