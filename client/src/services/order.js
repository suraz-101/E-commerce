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

const getAll = async () => {
  const data = await instance.get(URLS.ORDERS);
  return data;
};

const statusUpdate = async (payload) => {
  console.log("payload for status update", payload);
  const data = await instance.patch(URLS.ORDERS, payload);
  return data;
};

export { createOrder, getOrdersOfUser, getAll, statusUpdate };
