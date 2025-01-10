const fs = require('fs');
const { NOTIFIED_STORIES_FILE } = require('../config/config');
const logger = require('./common/logger');

function loadNotifiedStories() {
  if (fs.existsSync(NOTIFIED_STORIES_FILE)) {
    logger.debug('Notified stories file exists, loading...');
    const data = fs.readFileSync(NOTIFIED_STORIES_FILE, 'utf8');
    return new Set(JSON.parse(data));
  }
  logger.debug('Notified stories file does not exist, creating new set...');
  return new Set();
}

function saveNotifiedStories(stories) {
  logger.debug('Saving notified stories to file...');
  fs.writeFileSync(NOTIFIED_STORIES_FILE, JSON.stringify(Array.from(stories)), 'utf8');
}

module.exports = { loadNotifiedStories, saveNotifiedStories };