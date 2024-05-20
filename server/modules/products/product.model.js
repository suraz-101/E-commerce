const { Schema, model } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new Schema(
  {
    name: { type: String, required: [true, "name is required"], uique: true },
    description: { type: String, required: [true, "description is mandatory"] },
    price: { type: Number, required: [true, "price is mandatory"] },
    cateogry: {
      type: ObjectId,
      ref: "cateogory",
      required: [true, "category is mandatory"],
    },
    stockQuantity: { type: Number, required: true },
    image: { type: [String], required: true },
  },
  { timestamps: true }
);

const ProductModel = new model("products", productSchema);

module.exports = ProductModel;
