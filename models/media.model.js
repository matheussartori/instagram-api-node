const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MediaSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: {type: String, default: '' },
    type: {type: String, default: 'image'},
    media_url: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    tags: []
});


let Media = mongoose.model('Media', MediaSchema);

module.exports = Media;