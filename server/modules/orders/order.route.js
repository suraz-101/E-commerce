const router = require("express").Router();
const {
  getEsewaPaymentHash,
  verifyEsewaPayment,
} = require("../../services/esewa");
const orderController = require("../orders/order.controller");
const OrderModel = require("./order.model");
const PaymentModel = require("./payment.model");

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

router.post("/initialize-esewa", async (req, res, next) => {
  try {
    const result = await orderController.createOrder(req.body);

    // Respond with payment details
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/complete-payment", async (req, res) => {
  // Data received from eSewa's redirect

  try {
    const { data } = req.query;

    // {...data, transaction}
    // Verify payment with eSewa
    const result = await orderController.completePayment(data);
    console.log("result", result);

    // Respond with success message
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during payment verification",
      error: error.message,
    });
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const result = await orderController.createOrder(req.body);
//     res.status(200).json({ message: result });
//   } catch (error) {
//     next(error);
//   }
// });
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
