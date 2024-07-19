const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    orderDate: { type: Date, default: Date.now },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "canceled"],
      default: "pending",
    },

    customerId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String },
    shippingAddress: { type: String },

    paymentMethod: { type: String, enum: ["esewa", "khalti"], required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    items: [
      {
        productId: { type: ObjectId, ref: "Product" },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        image: { type: String },
        description: { type: String },
      },
    ],

    totalPrice: { type: Number, required: true },
    currency: { type: String, default: "USD" },

    trackingInfo: { type: String },
  },
  { timestamps: true }
);

const OrderModel = new mongoose.model("orders", orderSchema);


module.exports = OrderModel;

