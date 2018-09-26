let logger = require('../../services/logger.js');

let Media = require('../../models/media.model.js');

module.exports = app => {
    app.get('/tags/search/:tag', (req, res) => {
        let tag = req.params.tag;

        Media.find({ tags: tag }, (err, media) => {
            if(err) {
                res.status(400).send(err);
            } else {
                if(media) {
                    res.status(200).send(media);
                } else {
                    res.status(400).send({error: "Tag not found."});
                }
            }
        });
    });
}