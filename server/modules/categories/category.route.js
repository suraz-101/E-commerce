const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside get method of category" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside get method of category" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside get method of category" });
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