# HN500 Monitor

HN500 Monitor is a Node.js application that monitors Hacker News for stories reaching 500 votes and sends notifications via Pushover.

## Features

- Fetches top stories from Hacker News API
- Checks for stories with 500 or more votes
- Sends notifications using Pushover
- Logs activities and errors
- Runs on a scheduled basis using node-cron

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   PUSHOVER_USER_KEY=your_pushover_user_key
   PUSHOVER_API_TOKEN=your_pushover_api_token
   LOG_LEVEL=info
   ```

## Pushover Setup

Before using this application, you need to set up Pushover:

1. Install the Pushover app on your mobile device.
2. Create an account at [pushover.net](https://pushover.net/).
3. After logging in, you'll find your User Key on the dashboard.
4. Create a new application to get an API Token:
   - Go to [Create a New Application](https://pushover.net/apps/build)
   - Fill in the required details
   - Submit the form to receive your API Token
5. Use the User Key and API Token in your `.env` file.

## Usage

To start the application, run:
```
npm start
```

The application will check for stories with 500 or more votes every 30 minutes and send notifications via Pushover.
