const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post("/update", userControllers.updateInformation);
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/google-login", userControllers.googleSignUp);

module.exports = router;

// const express = require("express");
// const userController = require("../controllers/userController");
// const router = express.Router();
// const { check } = require("express-validator");

// router.post(
//   "/login",
//   [
//     check("phone").not().isEmpty().isLength({ min: 3, max: 20 }),
//     check("password").not().isEmpty().isLength({ min: 5, max: 30 }),
//   ],
//   userController.login
// );

// router.post(
//   "/register",
//   [
//     check("username").not().isEmpty().isLength({ min: 3, max: 20 }),
//     check("email").not().isEmpty().isEmail(),
//     check("phone").not().isEmpty().isLength({ min: 5, max: 10 }),
//     check("password").not().isEmpty().isLength({ min: 5, max: 30 }),
//   ],
//   userController.register
// );

// module.exports = router;
