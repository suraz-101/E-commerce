const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  password: joi.string().required(),
  phoneNumber: joi.number().required(),
  profilePic: joi.string(),
  role: joi.array().items(joi.string().valid("user", "admin")),
  otp: joi.number(),
});

const loginSchema = joi.object({
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: joi.string().required(),
});

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  error ? res.status(500).json({ error: error }) : next();
};

const userValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  error ? res.status(500).json({ error: error }) : next();
};

module.exports = { userValidation, loginValidation };
