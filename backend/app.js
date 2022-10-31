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

const app = express();
const mongoUrl = config.MONGODB_URI;
logger.log(`Connecting to ${mongoUrl}`);
// TODO: Add dev and test databases and populate them with test data,
// maybe using faker.js?
mongoose.connect(mongoUrl).then(() => {
    logger.log('Connected to MongoDB');
}).catch((error) => {
    logger.error(`Error connection to MongoDB: ${error.message}`);
});

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
