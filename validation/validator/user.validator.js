const validation = require('../constants/messages');
const { body, validationResult } = require('express-validator')

//validate user form registration field 
exports.userRegisterRules = () => {
    return [
        body('name').trim(" ").not().isEmpty().withMessage(validation.validationRules.nameRequiredField),
        body('email').trim(" ").not().isEmpty().withMessage(validation.validationRules.emailRequired),
        body('email').isEmail().withMessage(validation.validationRules.emailValid),
        body('password').trim(" ").not().isEmpty().withMessage(validation.validationRules.passwordRequired),
    ]
}

exports.userLoginRules = () => {
    return [
        body('email').trim(" ").not().isEmpty().withMessage(validation.validationRules.emailRequired),
        body('email').isEmail().withMessage(validation.validationRules.emailValid),
        body('password').trim(" ").not().isEmpty().withMessage(validation.validationRules.passwordRequired),
    ]
}

//return the response of validation
exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({
        [err.param]: err.msg
    }))

    return res.status(422).json({
        status: 412,
        errors: extractedErrors,
    })
}