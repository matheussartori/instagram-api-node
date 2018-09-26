const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    media: {type: Schema.Types.ObjectId, ref: 'Media', required: true},
    text: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});


let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;