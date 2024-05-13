const jwt = require("jsonwebtoken");

const generateJwtToken = (payload) => {
  return jwt.sign({ data: payload }, process.env.SECRETKEY, {
    expiresIn: process.env.DURATION,
  });
};

module.exports = { generateJwtToken };
