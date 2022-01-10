//const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_KEY);

module.exports.register = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.json({
  //     message: "Invalid inputs passed, please check your data.",
  //   });
  // }

  const { username, phone, password, email, address } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({
      $or: [
        {
          email: email,
        },
        { phone: phone },
      ],
    });
  } catch (err) {
    return res.json({ message: "Signing up failed, please try again later." });
  }

  if (existingUser) {
    return res.json({ message: "Phone already exists." });
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.json({ message: "Signing up failed, please try again later." });
  }

  const createdUser = new User({
    username,
    phone,
    password: hashedPassword,
    email,
    address,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return res.json({ message: "Signing up failed, please try again later." });
  }

  let token = createToken({
    userId: createdUser._id,
    email: createdUser.email,
  });

  res.json({
    message: "OK",
    userId: createdUser._id,
    token: token,
  });
};

module.exports.login = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.json({
  //     message: "Invalid inputs passed, please check your data.",
  //   });
  // }

  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({
      $or: [
        {
          email: email,
        },
        { phone: email },
      ],
    });
  } catch (error) {
    return res.json({ message: "Logging in failed, please try again later." });
  }

  if (!existingUser) {
    return res.json({ message: "Invalid credentials could not log you in." });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return res.json({ message: "Invalid credentials could not log you in." });
  }

  if (!isValidPassword) {
    return res.json({ message: "Invalid credentials could not log you in." });
  }

  let token = createToken({
    userId: existingUser._id,
    email: existingUser.email,
  });

  res.json({
    message: "OK",
    userId: existingUser._id,
    token: token,
  });
};

module.exports.updateInformation = async (req, res, next) => {
  let user;
  try {
    user = User.findByIdAndUpdate("61d742b3758fbe25291fc8fc", {
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      password: req.body.password,
    });

    await user.exec();
  } catch (error) {
    console.log(error);
    return res.json({
      message: "updating data failed, please try again later.",
    });
  }
  console.log(user);
  return res.json({
    message: "OK",
  });
};

module.exports.googleSignUp = async (req, res, next) => {
  const { tokenId } = req.body;
  let user;

  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_KEY,
    });
    const { email_verified, name, email } = response.payload;

    if (email_verified) {
      user = await User.findOne({ email: email }).exec();
      if (user) {
        let token = createToken({ userId: user._id, email: user.email });
        return res.json({
          message: "OK",
          userId: user._id,
          token: token,
        });
      } else {
        return res.json({ message: "NOT" });
        // let hashedPassword = await bcrypt.hash(email, 12);

        // user = new User({
        //   username: name,
        //   password: hashedPassword,
        //   email: email,
        //   address: "google address",
        //   phone: "google phone",
        // });
      }
    } else {
      return res.json({ message: "Error signing with google" });
    }
  } catch (error) {
    return res.json({ message: "Error finding user" });
  }

  // try {
  //   await user.save();
  // } catch (err) {
  //   return res.json({ message: "Signing up failed, please try again later." });
  // }

  // let token = createToken({ userId: user._id, email: user.email });

  // return res.json({
  //   message: "OK",
  //   userId: user._id,
  //   token: token,
  // });
};

const createToken = (values) => {
  let token;
  try {
    token = jwt.sign(values, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.log("from token");
    return res.json({ message: "Error creating token" });
  }

  return token;
};
