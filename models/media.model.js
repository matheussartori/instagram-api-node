const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MediaSchema = new Schema({
    comments: {
    	count: {type: Number, default: 0}
    },
	created_at: {type: Date, default: Date.now},
	title: {type: String, default: '' },
    likes: {
    	count: {type: Number, default: 0}
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    image_url: {type: String, required: true},
    type: {type: String, default: 'image'},
    tags: []
});


let Media = mongoose.model('Media', MediaSchema);

module.exports = Media;