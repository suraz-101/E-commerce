import { URLS } from "../contants";
import instance from "../utils/api";

const addCategory = async (payload) => {
  // console.log("services :", payload);
  const data = await instance.post(URLS.CATEGORIES, payload, {
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
  });
  // console.loc(data);
  return data;
};

const getAllCategories = async () => {
  console.log("we are in services");
  const data = await instance.get(URLS.CATEGORIES);
  console.log("data", data);
  return data;
};

const getById = async (name) => {
  console.log("services", name);
  return await instance.get(URLS.CATEGORIES + `/${name}`);
};
const removeProduct = async (id) => {
  return await instance.delete(URLS.PRODUCTS + `/${id}`);
};

export { getAllCategories, addCategory, getById };
