let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let validator = require('express-validator');
let morgan = require('morgan');
let logger = require('../services/logger.js');

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/instagram_api';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
let db = mongoose.connection;

module.exports = () => {
    let app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views','./app/views');

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
        .then('services')
        .into(app);

    mongoose.connect(mongoDB, {useNewUrlParser: true});
    mongoose.Promise = global.Promise;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    return app;
}