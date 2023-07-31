
const { Router } = require('express');
const { signup, login } = require('../controllers/authController')
const { validateUserData, validateLogin } = require('../midllewares/validator')

const authRouter = Router();
authRouter.post("/signup", validateUserData, signup);
authRouter.post("/login", validateLogin, login);

module.exports = authRouter;