const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    is_role: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
}, { collection: 'user' });

module.exports = mongoose.model('user', UserSchema);