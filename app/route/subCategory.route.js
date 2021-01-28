const express = require('express');
const router = express.Router();

const subCategoryController = require('../controller/subCategory.controller');
const { verifyToken, verifyAdmin } = require('../../services/verifytoken')

const {
    createSubCategoryRules,
    listSubCategoryRules,
    validate
} = require('../../validation/validator/subCategory.validator');


router.post('/create', verifyToken, verifyAdmin, createSubCategoryRules(), validate, subCategoryController.create);
router.post('/list', verifyToken, verifyAdmin, listSubCategoryRules(), validate, subCategoryController.list);

module.exports = router;