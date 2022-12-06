const joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const commentSchema = joi.object({
  authorId: joi.string().required(),
  comment: joi.string().required(),
});

exports.validateComment = validator(commentSchema);
