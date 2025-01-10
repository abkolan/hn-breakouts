const fs = require('fs');
const path = require('path');
const winston = require('winston');
const { LOG_LEVEL, LOG_DIR } = require('../../config/config');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const { combine, timestamp, printf, colorize } = winston.format;

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      )
    }),
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'hn_monitor.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      )
    })
  ],
});

module.exports = logger;