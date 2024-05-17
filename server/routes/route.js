const userRouter = require("../modules/users/user.route");
const categoryRouter = require("../modules/categories/category.route");
const router = require("express").Router();

router.use("/users", userRouter);
router.use("/categories", categoryRouter);

// router.use("/users", )

module.exports = router;
