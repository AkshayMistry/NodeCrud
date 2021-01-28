const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');

const {
    userRegisterRules,
    userLoginRules,
    validate
} = require('../../validation/validator/user.validator');


router.post('/register', userRegisterRules(), validate, userController.register);
router.post('/login', userLoginRules(), validate, userController.login);

module.exports = router;