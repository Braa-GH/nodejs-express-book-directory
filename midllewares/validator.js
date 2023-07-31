const { bookDataSchema, bookIdSchema } = require('../validation/bookValidation')
const { signupSchema, loginSchema } = require('../validation/userValidation');
const createError = require("http-errors");

//this middleware to validate requests that contains bookData in their body
const validateBookData = (req,res,next) => {
    const bookData = req.body;
    const validationResult = bookDataSchema.validate(bookData);
    if (validationResult.error){
        return next(createError(400, validationResult.error.message))
    }
    return next();
}

//this middleware to validate requests that contains book id in their params
const validateBookId = (req,res,next) => {
    const { Id } = req.params;
    const validation = bookIdSchema.validate(Id);
    if (validation.error){
        return next(createError(400, validation.error.message))
    }
    return next();
}

//this middleware to validate user data sent inside post body request from signup route
const validateUserData = (req,res,next) => {
    const userData = req.body;
    const validationResult = signupSchema.validate(userData);
    if (validationResult.error) return next(createError(400, validationResult.error.message));
    return next();
}

const validateLogin = (req,res,next) => {
    const userData = req.body;
    const validationResult = loginSchema.validate(userData);
    if (validationResult.error) return next(createError(400, validationResult.error.message));
    return next();
}

module.exports = {
    validateBookData, validateBookId, validateUserData, validateLogin
}