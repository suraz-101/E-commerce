import { URLS } from "../contants";
import instance from "../utils/api";

const createOrder = async (payload) => {
  const data = await instance.post(URLS.ORDERS, payload);
  return data;
};

const getOrdersOfUser = async (email) => {
  console.log("services", email);
  const data = await instance.get(URLS.ORDERS + `/usersOrder?email=${email}`);
  return data;
};

export { createOrder, getOrdersOfUser };
