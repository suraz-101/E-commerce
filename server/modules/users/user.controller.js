const { decrypt } = require("dotenv");
const { mailer } = require("../../services/mailer");
const { hashPassword, dcrypt } = require("../../utils/bcrypt");
const {
  generateJwtToken,
  generateOtpCode,
  createRandomString,
} = require("../../utils/token");
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

const forgetPassword = async ({ email }) => {
  if (!email) throw new Error("Please enter email ");
  const user = await UserModel.findOne({ email });
  console.log("controller", user);
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

const changePassword = async (payload) => {
  const { email, oldPassword, newPassword } = payload;
  if (!email || !oldPassword || !newPassword)
    throw new Error("something is missing!!");
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("email does not matched");
  const password = user.password;
  const isValid = await decrypt(password, oldPassword);
  if (!isValid) throw new Error("old password does not matched!");
  const hashedPass = await hashPassword(newPassword);
  const updatedUser = await UserModel.updateOne(
    { email },
    { password: hashedPass }
  );
  if (!updatedUser) throw new Error("Password change failed!!");
  return "Password Changed Successfully";
};

const resetPassword = async (_id) => {
  if (!_id) throw new Error("id is required");
  const user = await UserModel.findOne({ _id });
  const newPassword = await createRandomString(10);
  if (!user) throw new Error("user does not exist");
  const email = user.email;
  const hashPass = await hashPassword(newPassword);
  const updateUser = await UserModel.updateOne({ _id }, { password: hashPass });
  if (!updateUser) throw new Error("password reset failed");
  const mail = await mailer(
    email,
    "Reset Password",
    `The new Password is  ${newPassword}`
  );
  if (!mail) throw new Error("failed to send mail");
  return "password has been reset successfully!!";
};

const updateUsersDetails = async (id, payload) => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) throw new Error("user not found");
  const updated = await UserModel.updateOne({ _id: id }, payload);
  if (!updated) throw new Error("cannot update user details");
  return "user updated successfully";
};

const deleteUser = async (_id) => {
  const deleteUser = await UserModel.deleteOne({ _id });
  if (!deleteUser) throw new Error("Cannot delete the user");
  return "user deleted successfully";
};
module.exports = {
  registerUser,
  updateUsersDetails,
  getAllUsers,
  deleteUser,
  login,
  forgetPassword,
  verifyOtpCode,
  changePassword,
  resetPassword,
};
