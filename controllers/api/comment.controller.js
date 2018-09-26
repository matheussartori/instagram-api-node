let logger = require('../../services/logger.js');

let User = require('../../models/user.model.js');
let Media = require('../../models/media.model.js');
let Comment = require('../../models/comment.model.js');

module.exports = app => {
    app.get('/media/comments/:id', (req, res) => {
        let id = req.params.id;

        Comment.find({ media: id }, (err, comment) => {
        	if(err) {
                res.status(400).send(err);
            } else {
                if(comment) {
                    res.status(200).send(comment);
                } else {
                    res.status(400).send({error: "Media not found."});
                }
            }
        });
    });

    app.post('/media/comments/new', (req, res) => {
        let access_token = req.body.access_token;
        let secret_key = req.body.secret_key;
        let media = req.body.media;
        let text = req.body.comment;

        User.findOne({ access_token: access_token, secret_key: secret_key }, (err, user) => {
            if (err) {
                res.status(400).send(err);
            } else {
                if(user) {
                	Media.findOne({ _id: media }, (err, media) => {
                		let comment = new Comment({
				            user: user._id,
				        	media: media._id,
				        	text: text
				        });

				        comment.save(err => {
				            if (err) {
				                res.send(err)
				                return;
				            }
				            res.status(201).send('Comment posted successfully.');
				        });
                	});
                } else {
                    res.status(204).send({error: 'Cannot post with this parameters.'});
                }
            }
        });
    });
}