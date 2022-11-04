const joi = require('joi')

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })

const postSchema = joi.object({
    userId:joi.string().required(),
    description: joi.string().required(),
    url: joi.string(),
    location: joi.string()
});

exports.validatePost = validator(postSchema)