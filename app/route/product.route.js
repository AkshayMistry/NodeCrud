const express = require('express');
const router = express.Router();

const productController = require('../controller/product.controller');
const { verifyToken, verifyAdmin } = require('../../services/verifytoken')

const {
    createProductRules,
    updateProductRules,
    validate
} = require('../../validation/validator/product.validator');


router.post('/create', verifyToken, verifyAdmin, createProductRules(), validate, productController.create);
router.post('/update', verifyToken, verifyAdmin, updateProductRules(), validate, productController.update);
router.post('/show', verifyToken, verifyAdmin, updateProductRules(), validate, productController.show);
router.post('/list', verifyToken, verifyAdmin, productController.list);
router.post('/remove', verifyToken, verifyAdmin, updateProductRules(), validate, productController.remove);


module.exports = router;