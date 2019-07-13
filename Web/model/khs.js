const mongoose = require('mongoose');
const khsSchema = mongoose.Schema({
    npm         : {type: String, unique: true},
    nama        : String,
    semester    : String,
    mata_kuliah : String,
    ips         : String,
    created_at  : String
});
module.exports = mongoose.model('khs', khsSchema);
