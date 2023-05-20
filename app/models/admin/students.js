const mongoose = require('mongoose');

const StuSchema = mongoose.Schema({
    Stu_name: {
        type: String,
        required: true
    },
    Stu_code: {
        type: Number,
        required: true,
    },
    Stu_password: {
        type: String,
        required: true
    },
    Stu_email: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('StudentInfo', StuSchema);