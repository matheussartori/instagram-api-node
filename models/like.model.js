const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LikeSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    media: {type: Schema.Types.ObjectId, ref: 'Media', required: true},
    like: {type: Boolean, default: true, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


let Like = mongoose.model('Like', LikeSchema);

module.exports = Like;