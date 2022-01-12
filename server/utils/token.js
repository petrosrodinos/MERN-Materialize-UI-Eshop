const jwt = require("jsonwebtoken");

exports.createToken = (values) => {
  let token;
  try {
    token = jwt.sign(values, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.log("from token");
    return res.json({ message: "Error creating token" });
  }

  return token;
};
