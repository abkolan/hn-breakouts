const Pushover = require('pushover-notifications');
const { PUSHOVER_USER_KEY, PUSHOVER_API_TOKEN } = require('../../config/config');
const logger = require('./logger');

const push = new Pushover({
  user: PUSHOVER_USER_KEY,
  token: PUSHOVER_API_TOKEN,
});

function sendNotification(title, hnUrl) {
  return new Promise((resolve, reject) => {
    const msg = {
      message: `"${title}" has reached 500 votes on Hacker News!`,
      title: 'Hacker News Alert',
      url: hnUrl,
      url_title: 'View on Hacker News',
      priority: 1,
    };
    logger.info(`Sending notification: ${msg.message}`);

    push.send(msg, (err, result) => {
      if (err) {
        logger.error(`Error sending notification: ${err}`);
        return reject(err);
      }
      logger.info(`Notification sent: ${result}`);
      resolve(true);
    });
  });
}

module.exports = { sendNotification };