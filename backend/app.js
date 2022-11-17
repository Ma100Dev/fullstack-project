/* eslint-disable global-require */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
require('express-async-errors');

let usersRouter;
let loginRouter;
let propertyRouter;
let messageRouter;
let conversationRouter;
let cryptoRouter;

if (!config.NO_RUN) {
  usersRouter = require('./controllers/users');
  loginRouter = require('./controllers/login');
  propertyRouter = require('./controllers/properties');
  messageRouter = require('./controllers/messages');
  conversationRouter = require('./controllers/conversations');
  cryptoRouter = require('./controllers/crypto');
}

const createApp = async () => {
    logger.log('Environment:', config.ENV);

    const app = express();
    if (config.ENV === 'development' || config.ENV === 'test') { // If test or development, use in-memory database
      const { init } = require('./tests/db');
      const { populateUsers } = require('./tests/populateDb');
      init().then(() => {
          logger.log('Connected to database');
      });
      if (config.POPULATE_DB) { // If POPULATE_DB is true, populate the database with test data
        const populate = async () => {
            const users = await populateUsers(10000);
            logger.log('Populated database with users (', users.length, ')');
            logger.log(users); // Only for testing purposes, to be removed
        };
        await populate();
      }
    } else { // If production, use MongoDB
      const mongoUrl = config.MONGODB_URI;
      logger.log(`Connecting to ${mongoUrl}`);
      mongoose.connect(mongoUrl).then(() => {
          logger.log('Connected to MongoDB');
      }).catch((error) => {
          logger.error(`Error connection to MongoDB: ${error.message}`);
      });
    }

    if (config.NO_RUN) { // If NO_RUN is true, don't run the server and exit
      process.exit();
    }

    app.use(cors());
    app.use(express.json());
    app.use('/users', usersRouter);
    app.use('/login', loginRouter);
    app.use('/properties', propertyRouter);
    app.use('/messages', messageRouter);
    app.use('/conversations', conversationRouter);
    app.use('/crypto', cryptoRouter);

    app.use(middleware.errorHandler);

    return app;
};
module.exports = createApp;
