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

function createRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = { generateJwtToken, generateOtpCode, createRandomString };
