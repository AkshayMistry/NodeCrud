const express = require('express');
const router = express.Router();

const categoryController = require('../controller/category.controller');
const { verifyToken, verifyAdmin } = require('../../services/verifytoken')

const {
    createCategoryRules,
    validate
} = require('../../validation/validator/category.validator');


router.post('/create', verifyToken, verifyAdmin, createCategoryRules(), validate, categoryController.create);
router.get('/list', verifyToken, verifyAdmin, categoryController.list);

module.exports = router;