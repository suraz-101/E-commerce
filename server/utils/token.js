const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateJwtToken = (payload) => {
  return jwt.sign({ data: payload }, process.env.SECRETKEY, {
    expiresIn: process.env.DURATION,
  });
};

const generateOtpCode = () => {
  return crypto.randomInt(100000, 999999);
};

module.exports = { generateJwtToken, generateOtpCode };
