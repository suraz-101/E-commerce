import { URLS } from "../contants";
import instance from "../utils/api";

const getAllProducts = async () => {
  console.log("we are in services");
  return await instance.get(URLS.PRODUCTS);
};

const getById = async (id) => {
  return await instance.get(URLS.PRODUCTS + `/${id}`);
};

export { getAllProducts, getById };
