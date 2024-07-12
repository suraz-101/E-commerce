import { URLS } from "../contants";
import instance from "../utils/api";

const createProduct = async (payload) => {
  const data = await instance.post(URLS.PRODUCTS, payload, {
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const createCarosel = async (payload) => {
  return await instance.post(URLS.PRODUCTS + `/carosel`, payload, {
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
  });
};

const getAllProducts = async (sort, limit, page, category) => {
  const data = await instance.get(
    URLS.PRODUCTS +
      `?page=${page}&limit=${limit}&sort=${sort}&category=${category}`
  );
  return data;
};

const getProductByCategory = async (sort, limit, page, category) => {
  const data = await instance.get(
    URLS.PRODUCTS +
      `?page=${page}&limit=${limit}&sort=${sort}&category=${category}`
  );
  return data;
};

const getById = async (slug) => {
  return await instance.get(URLS.PRODUCTS + `/${slug}`);
};
const removeProduct = async (id) => {
  return await instance.delete(URLS.PRODUCTS + `/${id}`);
};

const updateQuantity = async (payload) => {
  console.log("services of update", payload);
  return await instance.patch(URLS.PRODUCTS + `/updateQuantity`, payload);
};

export {
  getAllProducts,
  getById,
  removeProduct,
  createProduct,
  updateQuantity,
  getProductByCategory,
  createCarosel,
};
