const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const productSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  category: joi.objectId().required(),
  stockQuantity: joi.number().required(),
  //   image: joi.string().required(),
});
const validation = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  error ? res.status(500).json({ error: error.details[0].message }) : next();
};

module.exports = { validation };
