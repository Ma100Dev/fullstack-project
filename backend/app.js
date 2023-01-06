/* eslint-disable global-require */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
require('express-async-errors');

const createApp = async () => {
    let usersRouter;
    let loginRouter;
    let propertyRouter;
    let messageRouter;
    let conversationRouter;
    let cryptoRouter;
    let reservationRouter;
    let testingRouter;

    if (!config.NO_RUN) {
      usersRouter = require('./controllers/users');
      loginRouter = require('./controllers/login');
      propertyRouter = require('./controllers/properties');
      messageRouter = require('./controllers/messages');
      conversationRouter = require('./controllers/conversations');
      cryptoRouter = require('./controllers/crypto');
      reservationRouter = require('./controllers/reservations');
      if (config.ENV === 'test') {
        testingRouter = require('./controllers/testing');
      }
    }
    logger.log('Environment:', config.ENV);

    const app = express();
    if (config.ENV === 'development' || config.ENV === 'test') { // If test or development, use in-memory database
      const { init } = require('./tests/utils/db');
      const {
          populateUsers,
          populateProperties,
          populateConversations,
          populateMessages,
          generateDefaultUser,
      } = require('./tests/utils/populateDb');

      await init();
      logger.log('Connected to database');

      if (config.POPULATE_DB) { // If POPULATE_DB is true, populate the database with test data
        const populate = async () => {
            const users = await populateUsers(100);
            logger.log('Populated database with users (', users.length, ')');
            const properties = await populateProperties(100);
            logger.log('Populated database with properties (', properties.length, ')');
            const conversations = await populateConversations(100);
            logger.log('Populated database with conversations (', conversations.length, ')');
            const messages = await populateMessages(1000);
            logger.log('Populated database with messages (', messages.length, ')');
            const defaultUser = await generateDefaultUser();
            logger.log('Generated default user (', defaultUser.username, ')');
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
    if (config.LOG_REQUESTS) {
      if (config.ENV === 'development') {
        app.use(morgan('dev'));
      } else {
        app.use(morgan('tiny'));
      }
    }
    app.use('/users', usersRouter);
    app.use('/login', loginRouter);
    app.use('/properties', propertyRouter);
    app.use('/messages', messageRouter);
    app.use('/conversations', conversationRouter);
    app.use('/crypto', cryptoRouter);
    app.use('/reservations', reservationRouter);
    if (config.ENV === 'test') {
      app.use('/testing', testingRouter);
    }

    app.use(middleware.errorHandler);
    return app;
};
module.exports = createApp;
