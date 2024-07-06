// const orderModel = require("./order.model");

const OrderModel = require("./order.model");

const createOrder = async (payload) => {
  const order = await OrderModel.create(payload);
  //   if (!order) throw new Error("failed to place order");
  return "order placed successfully";
};

const getAllOrders = () => {
  return "we are inside get method ";
};

module.exports = { createOrder, getAllOrders };
