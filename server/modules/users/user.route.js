const {
  registerUser,
  getAllUsers,
  login,
  forgetPassword,
  verifyOtpCode,
  changePassword,
  resetPassword,
  updateUsersDetails,
  deleteUser,
} = require("./user.controller");
const {
  userValidation,
  loginVlaidation,
  loginValidation,
} = require("./user.validator");

const userRouter = require("express").Router();

const multer = require("multer");
const { checkRole } = require("../../utils/sessionManager");

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
    const { page, limit, email } = req.query;
    const search = { email };
    const result = await getAllUsers(page, limit, search);
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

userRouter.post("/changePass", async (req, res, next) => {
  try {
    const result = await changePassword(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/resetPass", checkRole(["user"]), async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await resetPassword(id);
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
userRouter.put("/updateProfile", async (req, res, next) => {
  try {
    if (req.file) {
      req.body.profilePic = req.file.path.replace("public", "");
    }
    const { _id, rest } = req.body;
    const result = await updateUsersDetails(_id, rest);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

// Feaures of e-commerce application

// register user
// login
// forget pass
// change pass
// reset pass - admin
// view users list
// update profile

// add products - admin
// view all the added products  - admin
// add category
// update product
// delete product
// delete category

// view products - client
// add to cart - client
// add to favourite - client
// increase quantity
// Do payment
