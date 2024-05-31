import { URLS } from "../contants";
import instance from "../utils/api";

const getAllProducts = async () => {
  console.log("we are in services");
  return await instance.get(URLS.PRODUCTS);
};

export { getAllProducts };
