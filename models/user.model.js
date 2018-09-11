const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    id: {type: String, required: true},
    username: {type: String, required: true},
    full_name: String,
    profile_picture: String,
    bio: String,
    website: String,
    is_business: {type:Boolean, required: true},
    counts: {
    	media: Number,
    	follows: Number,
    	followed_by: Number
    }
});


let User = mongoose.model('User', UserSchema);