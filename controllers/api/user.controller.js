let logger = require('../../services/logger.js');
let shajs = require('sha.js');

let User = require('../../models/user.model.js');
let Media = require('../../models/media.model.js');

module.exports = app => {
    app.get('/users/timeline/:id', (req, res) => {
        let id = req.params.id;

        User.findOne({ _id: id }, (err, user) => {
            if (err) {
                res.status(400).send(err);
            } else {
                if(user) {
                    Media.find({ user: user._id }, (err, media) => {

                        for(var i = 0; i > media.length; i++) {
                            console.log(media);
                        }

                        res.status(200).send(media);
                    });
                } else {
                    res.status(400).send({error: 'User not found.'});
                }
            }
        });
    });

    app.post('/users/new', (req, res) => {
        req.assert('username',
            'Username can\'t be empty.').notEmpty();

        req.assert('password',
            'Password can\'t be empty.').notEmpty();

        let erros = req.validationErrors();
        if (erros) {
            res.status(400).send(erros);
            return;
        }

        User.findOne({ username: req.body.username }, (err, user) => {
            if(user) {
                res.status(400).send({status: "User exists"});
            }
            return;
        });

        let sha1 = shajs('sha1');

        let user = new User({
        	username: req.body.username,
            password: sha1.update(req.body.password).digest('hex'),
        	full_name: req.body.fullname,
        	profile_picture: req.body.profile_picture,
        	bio: req.body.bio,
        	website: req.body.website,
        	is_business: req.body.is_business,
            access_token: sha1.update(new Date() + 'c1760fedf79c430f9b274bacb89c6984').digest('hex'),
            secret_key: sha1.update(new Date() + 'cedbf496a3f898326c30a1cc76f8fcec').digest('hex'),
        });
        
        user.save(err => {
            if (err) {
                res.send(err)
                return;
            }
            res.status(201).send('User created successfully.');
        });
    });
}