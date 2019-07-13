const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username 			: {type: String, unique: true},
    hashed_password     : {type: String, unique: true},
    email			    : String,
    firstname	        : String,
    lastname            : String,
    admin               : String,
    created_at		    : String,
    temp_password	    : String,
    temp_password_time  : String,
    api_token           : String
});
module.exports = mongoose.model('user', userSchema);