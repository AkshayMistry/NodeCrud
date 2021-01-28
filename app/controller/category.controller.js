const categoryModel = require('../model/category.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

//add category
exports.create = async(req, res) => {
    try {
        const categoryAlreadyExist = await categoryModel.findOne({ name: req.body.name });

        if (categoryAlreadyExist) {
            res.json({ status: 201, msg: 'Category with same name is already exist.' });
        } else {
            let newCategory = new categoryModel({
                name: req.body.name,
                status: "available",
                created_at: new Date().toISOString(),
            });

            await newCategory.save();
            res.json({ status: 200, msg: 'Category created successfully.' });
        }
    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }
}

//add category
exports.list = async(req, res) => {
    try {
        const category = await categoryModel.find({ status: "available" });

        if (category) {
            res.json({ status: 200, data: category });

        } else {
            res.json({ status: 201, msg: 'Category not available.' });
        }
    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }
}