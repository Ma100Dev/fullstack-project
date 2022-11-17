/* eslint-disable global-require */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const propertyRouter = require('./controllers/properties');
const messageRouter = require('./controllers/messages');
const conversationRouter = require('./controllers/conversations');
const cryptoRouter = require('./controllers/crypto');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
require('express-async-errors');

logger.log('Environment:', config.ENV);

const app = express();
if (config.ENV === 'development' || config.ENV === 'test') {
  const { init } = require('./tests/db');
  const { populateUsers } = require('./tests/populateDb');
  init().then(() => {
      logger.log('Connected to database');
  });
  if (config.POPULATE_DB) {
    const populate = async () => {
        const users = await populateUsers(10000);
        logger.log('Populated database with users (', users.length, ')');
    };
    populate();
  }
} else {
  const mongoUrl = config.MONGODB_URI;
  logger.log(`Connecting to ${mongoUrl}`);
  mongoose.connect(mongoUrl).then(() => {
      logger.log('Connected to MongoDB');
  }).catch((error) => {
      logger.error(`Error connection to MongoDB: ${error.message}`);
  });
}

if (config.NO_RUN) {
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

module.exports = app;
