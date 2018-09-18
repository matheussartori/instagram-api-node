const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OAuthSchema = new Schema({
    id_user: {type: Schema.Types.ObjectId, ref: 'User'},
    consumer_key: {type: String, required: true},
    consumer_secret: {type: String, required: true},
    host: String,
    created_at: {type: Date, default: Date.now}
});


let OAuth = mongoose.model('OAuth', OAuthSchema);

module.exports = OAuth;