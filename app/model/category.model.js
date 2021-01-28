const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
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
}, { collection: 'category' });

module.exports = mongoose.model('category', categorySchema);