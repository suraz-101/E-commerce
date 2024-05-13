const { decrypt } = require("dotenv");
const { mailer } = require("../../services/mailer");
const { hashPassword, dcrypt } = require("../../utils/bcrypt");
const { generateJwtToken, generateOtpCode } = require("../../utils/token");
const UserModel = require("./user.model");

const registerUser = async (payload) => {
  const { password, email } = payload;
  const hashedPassword = await hashPassword(password);
  payload.password = hashedPassword;
  const user = await UserModel.create(payload);
  if (!user) throw new Error("Rgistration failed");
  console.log("I am here1");

  const res = await mailer(
    email,
    "Registration status",
    "You have successfully registered into the e-commerce application, CONGRATULATIONS!!"
  );
  if (!res) throw new Error("Registration failed");
  return "registration Successfull";
};

const getAllUsers = async (page = 1, limit = 10) => {
  const query = [];

  query.push([
    {
      $project: {
        _id: 0,
        password: 0,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
  ]);
  const result = await UserModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].total,
    page: +page,
    limit: +limit,
  };
};

const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password)
    throw new Error("username and password is mandatory");

  const response = await UserModel.findOne({ email });
  if (!response) throw new Error("email is incorrect");
  const { password: hash } = response;
  const isValid = await dcrypt(password, hash);
  if (!isValid) throw new Error("password is incorrect");
  const jwtPayload = {
    name: response.name,
    email: response.email,
    role: response.role,
  };
  const token = await generateJwtToken(jwtPayload);
  return token;
};

const forgetPassword = async (email) => {
  if (!email) throw new Error("Please enter email ");
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("user not found");
  const otpCode = await generateOtpCode();
  await UserModel.updateOne({ email }, { otp: otpCode });
  await mailer(email, "Otp Code", `The Otp Code is ${otpCode}`);
  return "Email sent";

  // const otpCode = await gene;
};

const verifyOtpCode = async (payload) => {
  const { email, otp, newPassword } = payload;
  if (!email || !otp || !newPassword) throw new Error("Something is missing!!");
  const user = await UserModel.findOne({ email });
  const userOtp = user.otp;
  if (userOtp != otp) throw new Error("invalid otp code");
  if (!user) throw new Error("user not found");
  const hash = await hashPassword(newPassword);
  const updatedUser = await UserModel.updateOne(
    { email },
    { password: hash, otp: "" }
  );
  if (!updatedUser)
    throw new Error("cannot change password. Something went wrong!!");
  return "password changed successfully!!";
};

module.exports = {
  registerUser,
  getAllUsers,
  login,
  forgetPassword,
  verifyOtpCode,
};
