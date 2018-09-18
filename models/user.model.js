const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    full_name: String,
    profile_picture: String,
    bio: String,
    website: String,
    is_business: {type:Boolean, default: false},
    access_token: {type: String, required: true},
    secret_key: {type: String, required: true},
    counts: {
    	media: {type: Number, default: 0},
    	follows: {type: Number, default: 0},
    	followed_by: {type: Number, default: 0}
    }
});


let User = mongoose.model('User', UserSchema);

module.exports = User;