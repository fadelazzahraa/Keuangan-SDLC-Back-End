const winston = require('winston');

// implement winston for logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logfile.log' }),
    ],
  });

module.exports = logger;