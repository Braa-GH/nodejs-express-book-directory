const joi = require('joi');

const signupSchema = joi.object({
    firstName: joi.string().min(2).max(100).required(),
    lastName: joi.link("firstName"),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+{};:,<.>]).{8,50}$")).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+{};:,<.>]).{8,50}$")).required()
})

module.exports = {
    signupSchema, loginSchema
}