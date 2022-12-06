const joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const registerSchema = joi.object({
  fname: joi.string().required(),
  lname: joi.string(),
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().min(3).max(10).required(),
});

const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(3).max(10).required(),
});

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);
