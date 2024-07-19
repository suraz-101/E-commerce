const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String, unique: true },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    amount: { type: Number, required: true },
    dateFromVerificationReq: { type: Object },
    apiQueryFromUser: { type: Object },
    paymentGateway: {
      type: String,
      enum: ["Khalti", "esewa", "connectIps"],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "pending",
    },
    paymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model("payment", paymentSchema);

module.exports = PaymentModel;
