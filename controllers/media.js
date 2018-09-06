let logger = require('../services/logger.js');

module.exports = (app) => {
    app.get('/media/search', (req, res) => {
        console.log('Search for recent media in a given area.');
    });
}