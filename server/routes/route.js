const userRouter = require("../modules/users/user.route");
const categoryRouter = require("../modules/categories/category.route");
const productRouter = require("../modules/products/product.route");
const orderRouter = require("../modules/orders/order.route");
const router = require("express").Router();

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/order", orderRouter);
// router.use("/users", )

module.exports = router;
