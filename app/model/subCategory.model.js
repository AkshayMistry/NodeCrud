const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    category_id: {
        type: Object,
        required: true
    },
    name: {
        type: String,
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
}, { collection: 'sub_category' });

module.exports = mongoose.model('sub_category', subCategorySchema);