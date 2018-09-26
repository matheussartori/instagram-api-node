let logger = require('../../services/logger.js');

module.exports = app => {
    app.get('/media/search', (req, res) => {
        console.log('Search for recent media in a given area.');
    });

    app.post('/media/new', (req, res) => {

        let title = req.body.title;
        let image_url = req.body.image_url;
        let tags = req.body.tags;
        let access_token = req.body.access_token;
        let secret_key = req.body.secret_key;

        User.findOne({ access_token: access_token, secret_key: secret_key }, function (err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                if(user) {
                	let media = new Media({
			        	title: title,
			            user: user._id,
			        	image_url: image_url,
			        	tags: tags
			        });
			        
			        media.save(err => {
			            if (err) {
			                res.send(err)
			                return;
			            }
			            res.status(201).send('User created successfully.');
			        });
                } else {
                    res.status(204).send({error: 'User not found'});
                }
            }
        });
    });
}