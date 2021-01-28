const validation = require('../constants/messages');
const { body, validationResult } = require('express-validator')

//validate user form registration field 
exports.createCategoryRules = () => {
    return [
        body('name').trim(" ").not().isEmpty().withMessage(validation.validationRules.nameRequiredField)
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