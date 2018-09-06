let logger = require('../services/logger.js');

module.exports = (app) => {
    app.get('/media/:media_id/comments', (req, res) => {
        let media_id = req.params.media_id;

        console.log('Get a list of recent comments on your media object.');
    });
}