const joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const postSchema = joi.object({
  description: joi.string(),
  url: joi.string(),
  location: joi.string(),
});

exports.validatePost = validator(postSchema);
