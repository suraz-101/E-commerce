const CategoryModel = require("./category.model");

const createCategory = async (payload) => {
  const category = await CategoryModel.create(payload);
  if (!category)
    throw new Error("could not create category. Please Try again!!");
  return "category created successfully";
};

const updateCategory = async (_id, payload) => {
  if (!_id) throw new Error("id is required");
  const category = await findOne({ _id });
  if (!category) throw new Error("category not found");
  const update = await CategoryModel.updateOne({ _id }, payload);
  if (!update) throw new Error("cannot update category. Please Try Again!!");
  return "category updated Successfully";
};

const getAllCategoryDetails = async () => {
  return await CategoryModel.find();
};
const getCategoryById = async (categoryName) => {
  const res = await CategoryModel.findOne(categoryName);
  return res;
};

const deleteCategory = () => {};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategoryDetails,
  getCategoryById,
};
