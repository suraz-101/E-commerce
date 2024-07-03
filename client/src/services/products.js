import { URLS } from "../contants";
import instance from "../utils/api";

const createProduct = async (payload) => {
  console.log("services", payload);
  const data = await instance.post(URLS.PRODUCTS, payload, {
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

const getAllProducts = async (sort, limit, page) => {
  const data = await instance.get(
    URLS.PRODUCTS + `?page=${page}&limit=${limit}&sort=${sort}`
  );
  console.log("data", data);
  return data;
};

const getById = async (slug) => {
  return await instance.get(URLS.PRODUCTS + `/${slug}`);
};
const removeProduct = async (id) => {
  return await instance.delete(URLS.PRODUCTS + `/${id}`);
};

export { getAllProducts, getById, removeProduct, createProduct };
