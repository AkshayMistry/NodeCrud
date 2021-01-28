const productModel = require('../model/product.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const {
    productPicImagePath,
    removeFileFromStorage,
} = require('../../services/upload');

//add product
exports.create = async(req, res) => {
    try {

        const productAlreadyExist = await productModel.findOne({
            name: req.body.name,
            cat_id: mongoose.Types.ObjectId(req.body.cat_id),
            sub_cat_id: mongoose.Types.ObjectId(req.body.sub_cat_id)
        });

        if (productAlreadyExist) {
            res.json({ status: 201, msg: 'Same product name is already exist.' });
        } else {

            let doc = req.body.image
            let mimeType = doc.match(/[^:/]\w+(?=;|,)/)[0];

            if (mimeType != "jpg" || mimeType != "jpeg" || mimeType != "png") {
                //generate random string of 5 char
                let random_String = Math.random().toString(36).substring(5);

                //image rename
                let docName = "prodcut_" + random_String + '.' + mimeType;

                //image storage path
                let docPath = path.join(__dirname, '../../public/product/' + docName);

                //base64 data gets
                const base64Data = doc.replace(/^data:([A-Za-z-+/]+);base64,/, '');

                //write file to particular path
                fs.writeFile(docPath, base64Data, 'base64', async function(err) {
                    if (err) {
                        res.json({ status: 412, msg: err.message });
                    }
                });
                //get product path url
                const productImageUrl = productPicImagePath(docName);

                let newproduct = new productModel({
                    name: req.body.name,
                    description: req.body.description,
                    image: productImageUrl,
                    price: req.body.price,
                    discount: req.body.discount,
                    cat_id: mongoose.Types.ObjectId(req.body.cat_id),
                    sub_cat_id: mongoose.Types.ObjectId(req.body.sub_cat_id),
                    status: "available",
                    created_at: new Date().toISOString(),
                });
                await newproduct.save();
                res.json({ status: 200, msg: 'Product created successfully.' });

            } else {
                res.json({ status: 412, msg: "You can upload image only." });

            }
        }
    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }
}

//edit  product
exports.update = async(req, res) => {

    try {
        const productData = await productModel.findById(req.body.product_id);

        if (productData) {
            if (req.body.image) {
                let doc = req.body.image
                let mimeType = doc.match(/[^:/]\w+(?=;|,)/)[0];

                if (mimeType != "jpg" || mimeType != "jpeg" || mimeType != "png") {
                    removeFileFromStorage(productData.image);

                    //generate random string of 5 char
                    let random_String = Math.random().toString(36).substring(5);

                    //image rename
                    let docName = "prodcut_" + random_String + '.' + mimeType;

                    //image storage path
                    let docPath = path.join(__dirname, '../../public/product/' + docName);

                    //base64 data gets
                    const base64Data = doc.replace(/^data:([A-Za-z-+/]+);base64,/, '');

                    //write file to particular path
                    fs.writeFile(docPath, base64Data, 'base64', async function(err) {
                        if (err) {
                            res.json({ status: 412, msg: err.message });
                        }
                    });
                    //get product path url
                    var productImageUrl = productPicImagePath(docName);
                    productData.name = req.body.name ? req.body.name : productData.name;
                    productData.description = req.body.description ? req.body.description : productData.description;
                    productData.price = req.body.price ? req.body.price : productData.price;
                    productData.image = req.body.image ? productImageUrl : productData.image;
                    productData.discount = req.body.discount ? req.body.discount : productData.discount;
                    productData.cat_id = req.body.cat_id ? mongoose.Types.ObjectId(req.body.cat_id) : productData.cat_id;
                    productData.sub_cat_id = req.body.sub_cat_id ? mongoose.Types.ObjectId(req.body.sub_cat_id) : productData.sub_cat_id;
                    productData.updated_at = new Date().toISOString();
                    await productData.save();

                    res.json({ status: 200, msg: 'product updated successfully.' });
                } else {
                    res.json({ status: 412, msg: "You can upload image only." });
                }
            }
        } else {
            res.json({ status: 400, msg: 'No product found with this id.' });
        }

    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }
}

//product info fatch
exports.show = async(req, res) => {

    try {
        var projection = {
            "_id": 1,
            "name": 1,
            "description": 1,
            "image": 1,
            "price": 1,
            "discount": 1,
            "status": 1,
            "created_at": 1,
            "category.name": 1,
            "category.status": 1,
            "sub_category.name": 1,
            "sub_category.status": 1,
        }
        const productData = await productModel.aggregate([{
                $match: { _id: mongoose.Types.ObjectId(req.body.product_id) }
            },
            {

                "$lookup": {
                    "from": "category",
                    "localField": "cat_id",
                    "foreignField": "_id",
                    "as": "category"
                },
            },
            {

                "$lookup": {
                    "from": "sub_category",
                    "localField": "sub_cat_id",
                    "foreignField": "_id",
                    "as": "sub_category"
                },
            },
            {
                $project: projection
            },
        ]);
        if (productData) {
            res.json({ status: 200, msg: 'Product info fatched successfully.', data: productData });
        } else {
            res.json({ status: 400, msg: 'No product found with this id.' });
        }

    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }
}

//list of product
exports.list = async(req, res) => {
    try {

        var projection = {
            "_id": 1,
            "name": 1,
            "description": 1,
            "image": 1,
            "price": 1,
            "discount": 1,
            "status": 1,
            "created_at": 1,
            "category.name": 1,
            "category.status": 1,
            "sub_category.name": 1,
            "sub_category.status": 1,
        }

        const PAGE_SIZE = req.body.limit; // Similar to 'limit'
        const skip = (req.body.page - 1) * PAGE_SIZE;


        const list = await productModel.aggregate([{

                "$lookup": {
                    "from": "category",
                    "localField": "cat_id",
                    "foreignField": "_id",
                    "as": "category"
                },
            },
            {

                "$lookup": {
                    "from": "sub_category",
                    "localField": "sub_cat_id",
                    "foreignField": "_id",
                    "as": "sub_category"
                },
            },
            { $skip: skip },
            { $limit: PAGE_SIZE },
            { "$sort": { "created_at": -1 } },
            {
                $project: projection
            },
        ]);
        var count = await productModel.find().countDocuments();
        res.json({ status: 200, msg: 'Vehical list.', data: { count: count, list } });
    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }
}

exports.remove = async(req, res) => {
    try {
        const product = await productModel.remove({
            _id: mongoose.Types.ObjectId(req.body.product_id),
        });
        if (product.deletedCount > 0) {
            res.json({ status: 200, msg: 'Product Removed Successfully.' });
        } else {
            res.json({ status: 201, msg: 'Product removed failed or product not found with this id, please try again.' });
        }
    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }

}