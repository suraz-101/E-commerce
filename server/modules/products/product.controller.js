const ProductModel = require("./product.model");

const createProduct = async (payload) => {
  console.log("controller product", payload);
  const product = await ProductModel.create(payload);
  if (!product) throw new Error("cannot create product. Please try again!!");
  return "product created successfully";
};

const getAllProducts = async (search, page = 1, limit = 10) => {
  const query = [];

  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(`${search?.name}`, "gi"),
      },
    });
  }
};

const getProductById = (_id) => {};

const updateProductDetails = (_id, payload) => {};

const updateProduct = (_id, payload) => {};

const deleteProduct = (_id) => {};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductDetails,
  updateProduct,
  deleteProduct,
};
