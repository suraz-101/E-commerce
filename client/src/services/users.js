import { URLS } from "../contants";
import instance from "../utils/api";

const createUser = (payload) => {
  return instance.post(URLS.REGISTER, payload, {
    // headers: { access_token: localStorage.getItem("access_token") },
  });
};

const login = (payload) => {
  const res = instance.post(URLS.LOGIN, payload, {
    // headers: { access_token: localStorage.getItem("access_token") },
  });

  return res;
};

const forgetPassword = (email) => {
  const res = instance.post(URLS.FORGET_PASSWORD, { email });
  console.log(res);
  return res;
};

const verifyOtp = (payload) => {
  const res = instance.post(URLS.VERIFY_OTP, payload);
  console.log(res);
  return res;
};

const getAllUsers = async (limit, page) => {
  console.log("we are inside services", limit);
  console.log("we are in services");
  return await instance.get(URLS.GETALLUSERS + `?page=${page}&limit=${limit}`);
};

const getById = async (email) => {
  console.log(" userservices", email);
  return await instance.get(URLS.GETALLUSERS + `/${email}`);
};

const updateAddress = (payload) => {
  return instance.patch(URLS.GETALLUSERS, payload);
};

// const getById = (email) => {
//   return instance.get(URLS.USERS + `/get-user?email=${email}`, {
//     headers: { access_token: localStorage.getItem("access_token") },
//   });
// };

// const changePass = (payload) => {
//   return instance.patch(URLS.USERS + `/changePassword`, payload, {
//     headers: {
//       access_token: localStorage.getItem("access_token"),
//     },
//   });
// };

// const remove = (id) => {
//   return instance.delete(URLS.USERS + `/deleteBlog/${id}`, {
//     headers: { access_token: localStorage.getItem("access_token") },
//   });
// };

export {
  login,
  getById,
  createUser,
  forgetPassword,
  verifyOtp,
  getAllUsers,
  updateAddress,
};
