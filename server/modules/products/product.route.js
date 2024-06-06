const Router = require("express").Router();

const multer = require("multer");
const { checkRole } = require("../../utils/sessionManager");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  updateProductDetails,
  deleteProduct,
} = require("./product.controller");
const { validation } = require("./product.validator");

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

Router.get("/", async (req, res, next) => {
  try {
    const { name, page, limit } = req.query;
    const search = { name };
    const result = await getAllProducts(search, page, limit);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

Router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const { page, limit } = req.query;
    const result = await getProductById(id, page, limit);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

Router.post(
  "/",
  upload.single("image"),
  validation,
  checkRole(["user"]),
  async (req, res, next) => {
    try {
      if (req?.file) {
        req.body.image = req.file.path.replace("public", "");
      }

      const result = await createProduct(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }
);

Router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace("public", "");
    }
    const { id } = req.params;
    const result = await updateProductDetails(id, req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

Router.patch("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside patch method of product" });
  } catch (error) {
    next(error);
  }
});

Router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProduct(id);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

module.exports = Router;
