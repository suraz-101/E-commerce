const { checkRole } = require("../../utils/sessionManager");
const multer = require("multer");
// const upload = multer();
const toPropperUpperCase = require("proper-upper-case");

const {
  createCategory,
  updateCategory,
  getAllCategoryDetails,
  getCategoryById,
} = require("./category.controller");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/categories"); //make sure the new folders are in the public folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
    // console.log(file.originalname.split("."));
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res, next) => {
  try {
    const result = await getAllCategoryDetails();
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const name = req.params;
    const result = await getCategoryById(name);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  upload.single("image"),
  checkRole(["admin"]),
  async (req, res, next) => {
    try {
      if (req?.file) {
        req.body.image = req.file.path.replace("public", "");
      }
      req.body.name = toPropperUpperCase(req.body.name);
      const result = await createCategory(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", async (req, res, next) => {
  try {
    const result = await updateCategory(id, req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside get method of category" });
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside get method of category" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
