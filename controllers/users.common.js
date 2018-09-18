let logger = require('../services/logger.js');

module.exports = (app) => {
    app.get('/register', (req, res) => {
        res.render('register');
    });

    app.get('/login/oauth', (req, res) => {
    	res.render('login');
    });

    app.post('/login/oauth/send', (req, res) => {
        res.render('oauth');
    });

    app.get('/login/create_token', (req, res) => {
        res.render('token');
    });
}