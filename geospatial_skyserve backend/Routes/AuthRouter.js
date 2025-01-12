const {signupValidation,loginValidation} = require('../Middlewares/AuthValidation');
const {signup} = require('../Controllers/AuthController');
const {login} = require('../Controllers/AuthController')
const router = require('express').Router();

router.post('/login',loginValidation,login)

router.post('/register',signupValidation,signup);

module.exports = router