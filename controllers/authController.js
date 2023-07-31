const { User } = require('../models');
const createError = require('http-errors');
const jwt = require('jsonwebtoken')

/**
 * @Rout: POST /api/v1/auth/signup
**/
const signup = (req,res,next) => {
    const userData = req.body;
    const user = new User(userData);
    user.add((err, result) => {
        if (err) return next(createError(err.statusCode || 500, err.message));
        else{
            return res.status(result.statusCode).json(result);
        }
    })
}

/**
 * @Rout: POST /api/v1/auth/login
**/
const login = (req,res,next) => {
    const userData = req.body;
    const user = new User(userData);
    user.login()
        .then(result => {
            if (result.status === true){
                const secretKey = process.env.JWT_KEY;
                const token = jwt.sign({...result.user}, secretKey);
                return res.status(200).json({ status: true, token })
            }else {
                return res.status(result.statusCode).json(result);
            }
        }).catch(err => next(createError(err.statusCode || 500, err.message)));
}

module.exports = {
    signup, login
}











