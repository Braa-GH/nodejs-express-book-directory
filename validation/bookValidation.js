const joi = require('joi');

const bookDataSchema = joi.object({
    title: joi.string().min(4).max(250).required(),
    author: joi.string().min(2).max(150).required(),
    edition: joi.number().integer().min(1).required()
})

const bookIdSchema = joi.number()
    .integer()
    .message("Book Id should be an integer number")
    .min(1)
    .message("Book Id should be greater than zero!")
    .required()

module.exports = {
    bookDataSchema,
    bookIdSchema
}