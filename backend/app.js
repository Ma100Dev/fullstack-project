const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const propertyRouter = require('./controllers/properties');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
require('express-async-errors');

const app = express();
const mongoUrl = config.MONGODB_URI;
logger.log(`Connecting to ${mongoUrl}`);
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

app.use(middleware.errorHandler);

module.exports = app;
