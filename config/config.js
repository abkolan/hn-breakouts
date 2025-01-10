require('dotenv').config();
const path = require('path');

module.exports = {
  TOP_STORIES_URL: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  PUSHOVER_USER_KEY: process.env.PUSHOVER_USER_KEY,
  PUSHOVER_API_TOKEN: process.env.PUSHOVER_API_TOKEN,
  NOTIFIED_STORIES_FILE: path.join(__dirname, 'notified_stories.json'),
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_DIR: 'logs'
};