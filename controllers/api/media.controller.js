let logger = require('../../services/logger.js');

let User = require('../../models/user.model.js');
let Media = require('../../models/media.model.js');
let Like = require('../../models/like.model.js');
let Comment = require('../../models/comment.model.js');

module.exports = app => {
    app.get('/media/search/:id', (req, res) => {
        let id = req.params.id;

        Media.findOne({ _id: id }, (err, media) => {
            if(err) {
                res.status(400).send(err);
            } else {
                if(media) {
                    let timeline = media.toObject();
                    
                    Like.countDocuments({ media: media._id }, (err, likes) => {

                        timeline.likes = {
                            count: likes
                        };

                        Comment.countDocuments({ media: media._id }, (err, comments) => {

                            timeline.comments = {
                                count: comments
                            };

                            res.status(200).send(timeline);
                        });
                    });
                } else {
                    res.status(400).send({error: "Media not found."});
                }
            }
        });
    });

    app.post('/media/new', (req, res) => {

        let title = req.body.title;
        let media_url = req.body.media_url;
        let tags = req.body.tags;
        let access_token = req.body.access_token;
        let secret_key = req.body.secret_key;

        User.findOne({ access_token: access_token, secret_key: secret_key }, (err, user) => {
            if (err) {
                res.status(400).send(err);
            } else {
                if(user) {
                	let media = new Media({
			        	title: title,
			            user: user._id,
			        	media_url: media_url,
			        	tags: tags
			        });
			        
			        media.save(err => {
			            if (err) {
			                res.send(err)
			                return;
			            }
			            res.status(201).send('Media posted successfully.');
			        });
                } else {
                    res.status(204).send({error: 'Cannot post with this parameters.'});
                }
            }
        });
    });
}