const axios = require('axios');
const { TOP_STORIES_URL } = require('../config/config');
const logger = require('./common/logger');
const { sendNotification } = require('./common/pushover');
const { loadNotifiedStories, saveNotifiedStories } = require('./stories');
const cron = require('node-cron');

async function checkHackerNews() {
  logger.info('Starting the script...');
  const notifiedStories = loadNotifiedStories();
  try {
    logger.info('Checking top stories on Hacker News...');
    const response = await axios.get(TOP_STORIES_URL);
    const storyIds = response.data;
    logger.info(`Number of top story IDs returned: ${storyIds.length}`);
    
    for (const storyId of storyIds) {
      if (notifiedStories.has(storyId)) {
        logger.info(`Story ${storyId} has already been notified, skipping...`);
        continue;
      }

      // Fetch story details
      const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
      const storyResponse = await axios.get(storyUrl);
      const story = storyResponse.data;

      if (story.score >= 500) {
        logger.info(`Story "${story.title}" has reached 500 votes!`);
        await sendNotification(story.title, `https://news.ycombinator.com/item?id=${storyId}`);
        notifiedStories.add(storyId);
        saveNotifiedStories(notifiedStories);
      }
    }
    logger.info('Top stories checked successfully!');
  } catch (error) {
    logger.error(`Error fetching top stories: ${error}`);
  }
}

// Schedule the checkHackerNews function to run every 30 minutes
cron.schedule('*/30 * * * *', checkHackerNews);

checkHackerNews();

