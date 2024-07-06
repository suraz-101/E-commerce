export const BASE_URL = "http://localhost:8000";

const API_VERSION = "api/v1";

export const URLS = {
  LOGIN: API_VERSION + "/users/login",
  REGISTER: API_VERSION + "/users/register",
  GETALLUSERS: API_VERSION + "/users",
  PRODUCTS: API_VERSION + "/products",
  FORGET_PASSWORD: API_VERSION + "/users/generateOtp",
  VERIFY_OTP: API_VERSION + "/users/verifyOtp",
  CATEGORIES: API_VERSION + "/categories",
  ORDERS: API_VERSION + "/orders",
};
