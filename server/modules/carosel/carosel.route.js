const Router = require("express").Router();

const multer = require("multer");
const { checkRole } = require("../../utils/sessionManager");
const { createCaroselProduct } = require("./carosel.controller");
// const { validation } = require("./product.validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/products"); //make sure the new folders are in the public folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
    // console.log(file.originalname.split("."));
  },
});

const upload = multer({ storage: storage });

Router.post(
  "/",
  upload.single("image"),
  checkRole(["admin"]),
  async (req, res, next) => {
    try {
      if (req?.file) {
        req.body.image = req.file.path.replace("public", "");
      }

      const result = await createCaroselProduct(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = Router;
