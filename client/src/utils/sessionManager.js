import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
  return localStorage.setItem("token", token);
};

export const getToken = (key) => {
  return localStorage.getItem(key);
};

export const currentUser = () => {
  const token = getToken("token");
  const { data } = jwtDecode(token);
  return localStorage.setItem("currentUser", JSON.stringify(data));
};
