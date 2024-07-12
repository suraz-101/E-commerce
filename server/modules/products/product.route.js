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
  createCaroselProduct,
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
    console.log(req.query);
    const { sort, name, page, limit, category } = req.query;
    const search = { name, category };
    const result = await getAllProducts(sort, search, page, limit);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

Router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;

    const { page, limit } = req.query;
    const result = await getProductById(slug, page, limit);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

Router.post(
  "/",
  upload.single("image"),
  validation,
  checkRole(["admin"]),
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

Router.patch("/updateQuantity", async (req, res, next) => {
  try {
    const { id, stockQuantity } = req.body;
    const result = await updateProduct(id, stockQuantity);
    res.status(200).json({ message: result });
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
