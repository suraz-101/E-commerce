const bcrypt = require("bcryptjs");
require("dotenv").config();

const hashPassword = (password) => {
  return bcrypt.hashSync(password, Number(process.env.SALT));
};

const dcrypt = (hashedPassword, password) => {
  console.log("password", password);
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { hashPassword, dcrypt };
