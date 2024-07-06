import { URLS } from "../contants";
import instance from "../utils/api";

const createOrder = async (payload) => {
  console.log("services", payload);
  const data = await instance.post(URLS.ORDERS, payload);
  return data;
};

export { createOrder };
