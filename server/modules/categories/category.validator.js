const { string } = require("joi");
const joi = require("joi");

const schema = joi.object({
  name: string().required(),
  description: string().required(),
});

const validator = (error, req, res) => {
  const { error } = schema.validate(req.body);
  error ? res.status(500).json({ error: error.details[0].message }) : next();
};

module.exports = { validator };
