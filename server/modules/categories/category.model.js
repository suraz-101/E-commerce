const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is mandatory"], unique: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = new mongoose.model("cateogory", categorySchema);

module.exports = CategoryModel;
