import { jwtDecode } from "jwt-decode";
import { getToken, removeToken } from "./sessionManager";
import moment from "moment";

export const isLoggedIn = () => {
  const token = getToken("token");
  if (!token) return false;
  const { exp } = jwtDecode(token);
  const now = moment(new Date().valueOf());
  const expDate = moment.unix(exp);
  if (now > expDate) {
    removeToken("token");
    removeToken("currentUser");
    alert("session expired");
    return false;
  }
  return true;
};

export const validRole = (role) => {
  if (role === "") return true;
  const token = getToken("token");
  const { data: user } = jwtDecode(token);
  const isValid = user.role.includes(role);
  if (!isValid) return false;
  return true;
};
