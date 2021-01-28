const validation = require('../constants/messages');
const { body, validationResult } = require('express-validator')

//validate product add
exports.createProductRules = () => {
    return [
        body('name').trim(" ").not().isEmpty().withMessage(validation.validationRules.nameRequiredField),
        body('description').trim(" ").not().isEmpty().withMessage(validation.validationRules.descriptionRequired),
        body('price').trim(" ").not().isEmpty().withMessage(validation.validationRules.priceRequired),
        body('discount').trim(" ").not().isEmpty().withMessage(validation.validationRules.discountRequired),
        body('cat_id').trim(" ").not().isEmpty().withMessage(validation.validationRules.categoryIdRequired),
        body('sub_cat_id').trim(" ").not().isEmpty().withMessage(validation.validationRules.subCategoryRequired)
    ]
}

//validate product add
exports.updateProductRules = () => {
        return [
            body('product_id').trim(" ").not().isEmpty().withMessage(validation.validationRules.productIdRequired),
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