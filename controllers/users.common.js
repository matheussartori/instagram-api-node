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
        req.assert('username',
            'Username can\'t be empty.').notEmpty();

        req.assert('password',
            'Password can\'t be empty.').notEmpty();

        var erros = req.validationErrors();
        if (erros) {
            console.log('Erros de validação encontrados.');
            res.status(400).send(erros);
            return;
        }
            
        let sha224 = shajs('sha224');

        var username = req.body.username;
        var password = sha224.update(req.body.password).digest('hex');

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