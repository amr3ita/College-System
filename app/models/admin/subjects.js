const mongoose = require('mongoose');
const SubSchema = mongoose.Schema({
    SUB_name: {
        type: String,
        required: true
    },
    SUB_code: {
        type: String,
        required: true
    },
    DB_name: {
        type: String,
        required: true
    },
    Pre_Req: {
        type: String
    }
});

module.exports = mongoose.model('Subject', SubSchema);