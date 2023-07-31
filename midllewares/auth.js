const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req,res,next) => {
    const tokenHeader = req.get("Authorization");
    //check if token is not exist
    if (!tokenHeader){
        return next(createError(401, "Token is required!"));
    }
    // remove Bearer keyword
    const token = tokenHeader.split(" ")[1];
    const secretKey = process.env.JWT_KEY;
    try{
        const decode = jwt.verify(token, secretKey);
        return next();
    }catch (e){
        return next(createError(401, "Unverified Token!"))
    }

}