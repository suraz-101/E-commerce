const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const caroselSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    description: { type: String, required: [true, "description is mandatory"] },
    price: { type: String, required: [true, "price is mandatory"] },
    slug: { type: String, required: true },
    colors: { type: [String] },
    address: { type: String, required: [true, "address is required"] },
    category: {
      type: ObjectId,
      ref: "cateogory",
      required: [true, "category is mandatory"],
    },
    stockQuantity: { type: String, required: true },
    image: { type: [String], required: [true, "image is mandatory"] },
  },
  { timestamps: true }
);

const CaroselModel = new mongoose.model("carosels", caroselSchema);

module.exports = CaroselModel;
