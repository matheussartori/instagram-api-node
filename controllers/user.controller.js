let logger = require('../services/logger.js');
let User = require('../models/user.model.js');

module.exports = app => {
    app.get('/users/self', (req, res) => {
        console.log('Get information about the owner of the access_token.');
    });

    app.get('/users/self/media/recent', (req, res) => {
        console.log('Get the most recent media published by the owner of the access_token.');
    });

    app.post('/users/new', (req, res) => {
        let user = new User({
        	id: req.body.id,
        	username: req.body.username,
        	full_name: req.body.fullname,
        	profile_picture: req.body.profile_picture,
        	bio: req.body.bio,
        	website: req.body.website,
        	is_business: req.body.is_business,
        	counts: {
        		media: 0,
        		follows: 0,
        		followed_by: 0
        	}
        });
        
        user.save(function (err) {
            if (err) {
                res.send(err)
                return;
            }
            res.send('User created successfully.');
        });
    });
}