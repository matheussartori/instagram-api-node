let logger = require('../../services/logger.js');

let User = require('../../models/user.model.js');
let Media = require('../../models/media.model.js');
let Like = require('../../models/like.model.js');

module.exports = app => {
    app.get('/media/likes/:id', (req, res) => {
        let id = req.params.id;

        Like.find({ media: id }, (err, Like) => {
        	if(err) {
                res.status(400).send(err);
            } else {
                if(Like) {
                    res.status(200).send(Like);
                } else {
                    res.status(400).send({error: "Media not found."});
                }
            }
        });
    });

    app.post('/media/likes/new', (req, res) => {
        let access_token = req.body.access_token;
        let secret_key = req.body.secret_key;
        let media = req.body.media;

        User.findOne({ access_token: access_token, secret_key: secret_key }, (err, user) => {
            if (err) {
                res.status(400).send(err);
            } else {
                if(user) {
                	Media.findOne({ _id: media }, (err, media) => {
                		let like = new Like({
				            user: user._id,
				        	media: media._id,
				        });

				        like.save(err => {
				            if (err) {
				                res.send(err)
				                return;
				            }
				            res.status(201).send('Liked successfully.');
				        });
                	});
                } else {
                    res.status(204).send({error: 'Cannot post with this parameters.'});
                }
            }
        });
    });
}