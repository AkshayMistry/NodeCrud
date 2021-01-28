const subCategoryModel = require('../model/subCategory.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

//add category
exports.create = async(req, res) => {
    try {
        const subCategoryAlreadyExist = await subCategoryModel.findOne({ name: req.body.name });

        if (subCategoryAlreadyExist) {
            res.json({ status: 201, msg: 'Sub-Category with same name is already exist.' });
        } else {
            let newCategory = new subCategoryModel({
                category_id: mongoose.Types.ObjectId(req.body.category_id),
                name: req.body.name,
                status: "available",
                created_at: new Date().toISOString(),
            });
            await newCategory.save();
            res.json({ status: 200, msg: 'Sub Category created successfully.' });
        }
    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }
}

//add category
exports.list = async(req, res) => {
    try {
        const subCategoryList = await subCategoryModel.find({ category_id: mongoose.Types.ObjectId(req.body.category_id) });
        if (subCategoryList) {
            res.json({ status: 200, data: subCategoryList });
        } else {
            res.json({ status: 201, msg: 'Sub Category not available.' });
        }
    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }
}