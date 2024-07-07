// const orderModel = require("./order.model");

const OrderModel = require("./order.model");

const createOrder = async (payload) => {
  const order = await OrderModel.create(payload);
  if (!order) throw new Error("failed to place order");
  return "order placed successfully";
};

const getAllOrders = () => {
  return OrderModel.find();
};

const getAllOrdersByUser = (email) => {
  return OrderModel.find({ customerEmail: email });
};

module.exports = { createOrder, getAllOrders, getAllOrdersByUser };
