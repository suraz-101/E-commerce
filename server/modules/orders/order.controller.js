// const orderModel = require("./order.model");

const {
  getEsewaPaymentHash,
  verifyEsewaPayment,
} = require("../../services/esewa");

const { v4: uuidv4 } = require("uuid");
const OrderModel = require("./order.model");
const PaymentModel = require("./payment.model");

const createOrder = async (payload) => {
  const { totalPrice } = payload;
  const order = await OrderModel.create(payload);

  // Initiate payment with eSewa
  const paymentInitiate = await getEsewaPaymentHash({
    amount: totalPrice,
    transaction_uuid: order?._id,
  });

  return {
    message: "order placed successfully",
    success: true,
    payment: paymentInitiate,
    order,
  };
  // };
  // const order = await OrderModel.create(payload);
  // if (!order) throw new Error("failed to place order");
  // return "order placed successfully";
};

const completePayment = async (data) => {
  const paymentInfo = await verifyEsewaPayment(data);
  console.log("paymentInfo");

  // Find the purchased item using the transaction UUID
  const purchasedItemData = await OrderModel.findById(
    paymentInfo.response.transaction_uuid
  );
  console.log("purchasedItemData", paymentInfo);

  if (!purchasedItemData) {
    return res.status(500).json({
      success: false,
      message: "Purchase not found",
    });
  }

  // let transactionId = await paymentInfo.decodedData.transaction_code;
  // transactionId = await (transactionId
  //   ? `${transactionId}-${uuidv4()}`
  //   : `fallback-${uuidv4()}`);

  // Create a new payment record in the databas'e'
  // await PaymentModel.create({
  //   // pidx: paymentInfo.decodedData.transaction_code,
  //   transactionId: transactionId,
  //   orderId: paymentInfo?.response?.transaction_uuid,
  //   amount: purchasedItemData?.totalPrice,
  //   dataFromVerificationReq: paymentInfo,
  //   apiQueryFromUser: data,
  //   paymentGateway: "esewa",
  //   status: "success",
  // });

  // Update the purchased item status to 'completed'
  const order = await OrderModel.findOne({
    _id: paymentInfo.response.transaction_uuid,
  });
  if (!order) throw new Error("order not found");
  await OrderModel.updateOne(
    { _id: paymentInfo.response.transaction_uuid },
    { paymentStatus: "completed" }
  );

  return {
    success: true,
    message: "Payment successful",
  };
};

const getAllOrders = () => {
  return OrderModel.find();
};

const getAllOrdersByUser = (email) => {
  return OrderModel.find({ customerEmail: email });
};

const updateOrderStatus = async (_id, orderStatus) => {
  return OrderModel.updateOne({ _id }, { orderStatus });
};
module.exports = {
  createOrder,
  getAllOrders,
  getAllOrdersByUser,
  updateOrderStatus,
  completePayment,
};
