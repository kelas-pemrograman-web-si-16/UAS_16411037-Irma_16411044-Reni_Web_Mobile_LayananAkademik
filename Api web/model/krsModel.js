const mongoose = require('mongoose');
const krsSchema = mongoose.Schema({
    npm         : {type: String, unique: true},
    nama 		: String,
    semester 	: String,
    mata_kuliah : String,
    created_at  : String
});
module.exports = mongoose.model('krsModel', krsSchema);