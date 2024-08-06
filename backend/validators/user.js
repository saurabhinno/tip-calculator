const { check } = require('express-validator');


const validateSignup = [
    check('name', 'invalid field (name)').not().isEmpty(),
    check('email', 'invalid field (email)').isEmail(),
    check('password', 'invalid field (password)').isLength({ min: 6 }),
  ];
  
const validateLogin = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ];
module.exports = {
    validateSignup,
    validateLogin
}