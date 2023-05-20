const mongoose = require('mongoose');
const deptSchema = mongoose.Schema({
    DP_name: {
        type: String,
        required: true
    },
    DP_code: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Department', deptSchema);