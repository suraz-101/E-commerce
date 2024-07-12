const CaroselModel = require("./carosel.model");

const createCaroselProduct = async (payload) => {
  payload.slug = generateSlug(payload.name) + "-" + Date.now();
  console.log("controller product", payload);
  const product = await CaroselModel.create(payload);
  if (!product)
    throw new Error("cannot create carosel product. Please try again!!");
  return "product created successfully";
};

module.exports = {
  createCaroselProduct,
};
