import { jwtDecode } from "jwt-decode";
import { getToken } from "./sessionManager";
import moment from "moment";

export const isLoggedIn = () => {
  const token = getToken("token");
  if (!token) return false;
  const { exp } = jwtDecode(token);
  const now = moment(new Date().valueOf());
  const expDate = moment.unix(exp);
  if (now > expDate) return false;
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
