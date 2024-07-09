import moment from "moment";

export const dateFormatter = (date) => {
  return moment(date).format("ll");
};
