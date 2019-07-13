const mongoose = require('mongoose');
const khsModelSchema = mongoose.Schema({
    npm         : {type: String, unique: true},
    nama 		: String,
    semester 	: String,
    mata_kuliah : String,
    ips         : String,
    created_at  : String
});
module.exports = mongoose.model('khsModel', khsModelSchema);