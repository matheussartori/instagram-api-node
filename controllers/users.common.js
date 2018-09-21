let logger = require('../services/logger.js');
let User = require('../models/user.model.js');

let shajs = require('sha.js');

const callback_url = 'https://sparksocialhub.com/instagram/callback';

module.exports = (app) => {
    app.get('/register', (req, res) => {
        res.render('register');
    });

    app.get('/login/oauth', (req, res) => {
    	res.render('login');
    });

    app.post('/login/oauth/send', (req, res) => {
        let sha224 = shajs('sha224');

        var username = req.body.username;
        var password = sha224.update(req.body.password).digest('hex');

        User.findOne({ username: username, password: password }, function (err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                if(user) {
                    res.redirect(callback_url + '?username=' + user.username + '&id_user=' + user._id +  '&access_token=' + user.access_token + '&secret_key=' + user.secret_key);
                } else {
                    res.status(204).send({error: 'User not found'});
                }
            }
        });

    });

    app.get('/login/create_token', (req, res) => {
        res.render('token');
    });
}