const Router = require("express").Router();

Router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside get method of product" });
  } catch (error) {
    next(error);
  }
});

module.exports = Router;
