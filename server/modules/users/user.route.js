const {
  registerUser,
  getAllUsers,
  login,
  forgetPassword,
  verifyOtpCode,
} = require("./user.controller");
const {
  userValidation,
  loginVlaidation,
  loginValidation,
} = require("./user.validator");

const userRouter = require("express").Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); //make sure the new folders are in the public folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
    // console.log(file.originalname.split("."));
  },
});

const upload = multer({ storage: storage });

userRouter.get("/", async (req, res, next) => {
  try {
    const result = await getAllUsers();
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});
userRouter.post(
  "/register",
  upload.single("profilePic"),
  userValidation,
  async (req, res, next) => {
    try {
      if (req.file) {
        const { path } = req.file;
        req.body.profilePic = path.replace("public", "");
      }
      const result = await registerUser(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post("/login", loginValidation, async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/generateOtp", async (req, res, next) => {
  try {
    const result = await forgetPassword(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/verifyOtp", async (req, res, next) => {
  try {
    const result = await verifyOtpCode(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json({
      message: `You are inside pathc method of users applicaiton with id ${id}`,
    });
  } catch (error) {
    next(error);
  }
});
userRouter.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ message: "You are inside put method of users applicaiton" });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ message: "You are inside delete method of users applicaiton" });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
