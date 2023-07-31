module.exports = (error, req, res, next) => {
    return res.status(error.statusCode).json({
        status: false,
        message: error.message
    })
};