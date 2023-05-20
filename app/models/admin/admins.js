const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    ADMIN_EMAIL: {
        type: String,
        required: true
    },
    ADMIN_PASSWORD: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('admin', adminSchema);