const createError = require("http-errors");

module.exports = (req,res,next) => {
    return next(createError(404, "Path Not Found!"))
}