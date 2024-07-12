import { URLS } from "../contants";
import instance from "../utils/api";

const createCarosel = async (payload) => {
  return await instance.post(URLS.CAROSEL, payload, {
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
  });
};

export { createCarosel };
