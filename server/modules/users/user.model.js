const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is mandatory"] },
    email: {
      type: String,
      required: [true, "email is mandatory"],
      unique: true,
    },
    password: { type: String, required: [true, "password is mandatory"] },
    phoneNumber: { type: Number, required: [true, "phone Number is required"] },
    profilePic: { type: String },
    address: { type: String },
    role: {
      type: [String],
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    otp: { type: Number },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("users", schema);

module.exports = UserModel;
