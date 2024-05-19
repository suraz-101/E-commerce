const joi = require("joi");

const schema = joi.object({});

const validator = (error, req, res) => {
  const { error } = schema.validate(req.body);
  error ? res.status(500).json({ error: error.details[0].message }) : next();
};

module.exports = { validator };
