const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    discount: {
        type: Number,
        required: true
    },
    cat_id: {
        type: Object,
        required: true
    },
    sub_cat_id: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        "enum": ["available", "notAvailable"],
        required: true
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
}, { collection: 'product' });

module.exports = mongoose.model('product', productSchema);