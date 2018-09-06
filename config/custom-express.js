let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let validator = require('express-validator');
let morgan = require('morgan');
let logger = require('../services/logger.js');

module.exports = () => {
    let app = express();

    app.use(morgan('common', {
        stream: {
            write: msg => {
                logger.info(msg);
            }
        }
    }));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(validator());

    consign()
        .include('controllers')
        .then('models')
        .then('services')
        .into(app);

    return app;
}