let logger = require('../../services/logger.js');

module.exports = (app) => {
    app.get('/tags/:tag_name', (req, res) => {
        let tag_name = req.params.tag_name;

        console.log('Get information about a tag object.');
    });

    app.get('/tags/:tag_name/media/recent', (req, res) => {
        let tag_name = req.params.tag_name;

        console.log('Get a list of recently tagged media.');
    });

    app.get('/tags/search', (req, res) => {
        console.log('Search for tags by name.');
    });
}