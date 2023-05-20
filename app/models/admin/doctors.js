const mongoose = require('mongoose');

const DocSchema = mongoose.Schema({
    Doc_name: {
        type: String,
        required: true
    },
    Doc_code: {
        type: Number,
        required: true,
    },
    Doc_email: {
        type: String,
        required: true
    },
    Doc_password: {
        type: String,
        required: true
    },
    SUB_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('DoctorInfo', DocSchema);