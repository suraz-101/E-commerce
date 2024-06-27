import { URLS } from "../contants";
import instance from "../utils/api";

const addCategory = async () => {
  const data = await instance.post(URLS.CATEGORIES);
  console.loc(data);
};

const getAllCategories = async () => {
  console.log("we are in services");
  const data = await instance.get(URLS.CATEGORIES);
  console.log("data", data);
  return data;
};

// const getById = async (id) => {
//   return await instance.get(URLS.PRODUCTS + `/${id}`);
// };
// const removeProduct = async (id) => {
//   return await instance.delete(URLS.PRODUCTS + `/${id}`);
// };

export { getAllCategories };
