// const joi = require("joi");

// const userSchema = joi.object({
//   name: joi.string().required(),
//   email: joi
//     .string()
//     .required()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     }),
//   password: joi.string().required(),
//   phoneNumber: joi.number().required(),
//   profilePic: joi.string(),
//   role: joi.array().items(joi.string().valid("user", "admin")),
//   otp: joi.number(),
// });
