let logger = require('../../services/logger.js');
let User = require('../../models/user.model.js');

let shajs = require('sha.js');

module.exports = app => {
    app.get('/users/self', (req, res) => {
        console.log('Get information about the owner of the access_token.');
    });

    app.get('/users/self/media/recent', (req, res) => {
        console.log('Get the most recent media published by the owner of the access_token.');
    });

    app.post('/users/new', (req, res) => {
        req.assert('username',
            'Username can\'t be empty.').notEmpty();

        req.assert('password',
            'Password can\'t be empty.').notEmpty();

        var erros = req.validationErrors();
        if (erros) {
            res.status(400).send(erros);
            return;
        }

        User.findOne({ username: req.body.username }, function (err, user) {
            if(user) {
                res.status(400).send({status: "User exists"});
            }
            return;
        });

        let sha224 = shajs('sha224');

        let user = new User({
        	username: req.body.username,
            password: sha224.update(req.body.password).digest('hex'),
        	full_name: req.body.fullname,
        	profile_picture: req.body.profile_picture,
        	bio: req.body.bio,
        	website: req.body.website,
        	is_business: req.body.is_business,
            access_token: sha224.update(new Date() + 'c1760fedf79c430f9b274bacb89c6984').digest('hex'),
            secret_key: sha224.update(new Date() + 'cedbf496a3f898326c30a1cc76f8fcec').digest('hex'),
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