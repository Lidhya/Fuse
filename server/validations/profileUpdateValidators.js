const joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const updateSchema = joi.object({
  _id: joi.string().required(),
  fname: joi.string().required(),
  lname: joi.string(),
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().min(3).max(10).required(),
  city: joi.string(),
  description: joi.string(),
});

exports.validateUpdate = validator(updateSchema);
