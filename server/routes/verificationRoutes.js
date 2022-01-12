const express = require("express");
const verificationControllers = require("../controllers/verificationControllers");

const router = express.Router();
router.post("/send-email", verificationControllers.sendEmail);
router.post("/send-sms", verificationControllers.sendSms);
router.post("/verify-code", verificationControllers.verifyCode);

module.exports = router;
