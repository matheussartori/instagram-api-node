let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let validator = require('express-validator');

module.exports = () => {
    let app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(validator());

    consign()
        .include('controllers')
        .then('models')
        .into(app);

    return app;
}