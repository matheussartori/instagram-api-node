let logger = require('../services/logger.js');
let User = require('../models/user.model.js');

let shajs = require('sha.js');

module.exports = (app) => {
    app.get('/register', (req, res) => {
        res.render('register');
    });

    app.get('/login/oauth', (req, res) => {
    	res.render('login');
    });

    app.post('/login/oauth/send', (req, res) => {
        console.log(req.body);
        var parser = JSON.parse(req.body);
            
        let sha224 = shajs('sha224');

        var username = parser.username;
        var password = sha224.update(parser.password).digest('hex');

        User.findOne({ username: username, password: password }, function (err, user) {
            if (err) {
                res.send(err);
                console.log('Erro: ' + err)
            } else {
                if(user) {
                    res.send(user);
                } else {
                    res.status(400);
                }
            }
        });

        // res.render('oauth');
    });

    app.get('/login/create_token', (req, res) => {
        res.render('token');
    });
}