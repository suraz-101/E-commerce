const router = require("express").Router();
const orderController = require("../orders/order.controller");

router.get("/", async (req, res, next) => {
  try {
    const result = await orderController.getAllOrders();
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

router.get("/usersOrder", async (req, res, next) => {
  try {
    const { email } = req.query;
    const result = await orderController.getAllOrdersByUser(email);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const result = await orderController.createOrder(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside delete method of order" });
  } catch (error) {
    next(error);
  }
});
router.put("/:id", (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside update method of order" });
  } catch (error) {
    next(error);
  }
});
router.patch("/", async (req, res, next) => {
  try {
    const { id, value } = req.body;
    const result = await orderController.updateOrderStatus(id, value);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
