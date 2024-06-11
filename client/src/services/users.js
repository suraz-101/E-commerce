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

// const updateUserDetails = (payload) => {
//   return instance.put(URLS.USERS + `/updateProfile`, payload, {
//     headers: {
//       access_token: localStorage.getItem("access_token"),
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

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

export { login, createUser, forgetPassword };
