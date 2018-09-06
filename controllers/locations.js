let logger = require('../services/logger.js');

module.exports = (app) => {
    app.get('/locations/:location_id', (req, res) => {
        let ocation_id = req.params.ocation_id;

        console.log('Get information about a location.');
    });

    app.get('/locations/:location_id/media/recent', (req, res) => {
        let location_id = req.params.location_id;

        console.log('Get a list of recent media objects from a given location.');
    });

    app.get('/locations/search', (req, res) => {
        console.log('Search for a location by geographic coordinate.');
    });
}