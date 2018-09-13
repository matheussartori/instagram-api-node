let logger = require('../services/logger.js');
let User = require('../models/user.model.js');

module.exports = app => {
    app.get('/register', (req, res) => {
        res.render('register');
    });

    app.get('/users/self', (req, res) => {
        console.log('Get information about the owner of the access_token.');
    });

    app.get('/users/self/media/recent', (req, res) => {
        console.log('Get the most recent media published by the owner of the access_token.');
    });

    app.post('/users/new', (req, res) => {
        req.assert('username',
            'Username can\'t be empty.').notEmpty();

        var erros = req.validationErrors();
        if (erros) {
            console.log('Erros de validação encontrados.');
            res.status(400).send(erros);
            return;
        }

        let user = new User({
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
            res.status(201).send('User created successfully.');
        });
    });
}