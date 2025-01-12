
const router = require('express').Router();
const {signup} = require('../Controllers/AuthController');
const {login} = require('../Controllers/AuthController')
const {signupValidation,loginValidation} = require('../Middlewares/AuthValidation');


router.post('/login',loginValidation,login)
router.post('/register',signupValidation,signup);

module.exports = router


