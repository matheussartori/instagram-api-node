const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MediaSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: {type: String, default: '' },
    type: {type: String, default: 'image'},
    media_url: {type: String, required: true},
    comments: {
        count: {type: Number, default: 0}
    },
    likes: {
        count: {type: Number, default: 0}
    },
    created_at: {type: Date, default: Date.now},
    tags: []
});


let Media = mongoose.model('Media', MediaSchema);

module.exports = Media;