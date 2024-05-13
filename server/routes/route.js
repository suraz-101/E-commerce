const userRouter = require("../modules/users/user.route");
const router = require("express").Router();

router.use("/users", userRouter);

// router.use("/users", )

module.exports = router;
