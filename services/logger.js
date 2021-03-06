let winston = require('winston');
let fs = require('fs');

if(!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

module.exports = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "logs/instagram.log",
            maxsize: 4194304,
            maxFiles: 100
        })
    ]
});