const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: joi.string().required(),
  phoneNumber: joi.number().required(),
  profilePic: joi.string(),
  role: joi.array().items(joi.string().valid("user", "admin")),
});

const userValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  error ? res.status(500).json({ error: error }) : next();
};

module.exports = { userValidation };
