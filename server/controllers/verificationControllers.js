const { generateOTP, mailTransport } = require("../utils/mail");
const { createToken } = require("../utils/token");
const User = require("../models/user");
const VerificationToken = require("../models/verificationToken");
const { isValidObjectId } = require("mongoose");
const client = require("twilio");
//const sgMail = require("@sendgrid/mail");

module.exports.sendEmail = async (req, res, next) => {
  try {
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: req.body.userId,
      token: OTP,
    });

    await verificationToken.save();

    // sgMail.setApiKey(process.env.MAIL_KEY);

    // const message = {
    //   to: "petros.rodinos@yahoo.com",
    //   from: "petrospotamaki@yahoo.gr",
    //   subject: "EmailVerification",
    //   text: "Email Verification Code: " + OTP,
    //   html: `<h1>Email Verification Code: ${OTP}</h1>`,
    // };

    // const res = await sgMail.send(message);
    // console.log(res);

    mailTransport().sendMail({
      from: "emailverification@gmail.com",
      to: req.body.email,
      subject: "Verify your email account",
      html: `<h1>${OTP}</h1>`,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Could not send verification email",
    });
  }

  return res.json({
    message: "OK",
  });
};

module.exports.sendSms = async (req, res, next) => {
  const sender = client(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

  try {
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: req.body.userId,
      token: OTP,
    });

    await verificationToken.save();

    const message = await sender.messages.create({
      body: "Your Verification Code: " + OTP,
      to: "+306975638081",
      from: "+37282720765",
    });

    console.log(message);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Could not send verification email",
    });
  }

  return res.json({
    message: "OK",
  });
};

module.exports.verifyCode = async (req, res, next) => {
  const { userId, otp, type } = req.body;
  if (!userId || !otp.trim())
    return res.json({
      message: "Verification failed, please try again later 1",
    });

  if (!isValidObjectId(userId)) return;

  const user = await User.findById(userId);
  if (!user)
    return res.json({
      message: "Verification failed, please try again later 2",
    });

  if (type === "email") {
    if (user.emailVerified)
      return res.json({ message: "You are already verified" });
  } else {
    if (user.phoneVerified)
      return res.json({ message: "You are already verified" });
  }

  const token = await VerificationToken.findOne({ owner: user._id });

  if (!token) return res.json({ message: "User not found" });

  const isMatched = await token.compareToken(otp);
  if (!isMatched)
    return res.json({
      message: "Invalid Verification Code, please try again later.",
    });

  if (type === "email") {
    user.emailVerified = true;
  } else {
    user.phoneVerified = true;
  }

  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();

  let userToken = createToken({
    userId: user._id,
    email: user.email,
  });

  res.json({
    message: "OK",
    userId: user._id,
    token: userToken,
  });
};
