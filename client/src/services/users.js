import { URLS } from "../contants";
import instance from "../utils/api";

// const createUser = (payload) => {
//   return instance.post(URLS.USERS, payload, {
//     headers: { access_token: localStorage.getItem("access_token") },
//   });
// };

const login = (payload) => {
  // console.log(limit, page);[]
  return instance.get(URLS.LOGIN, payload, {
    // headers: { access_token: localStorage.getItem("access_token") },
  });
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

export { login };
