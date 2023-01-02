const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('./config');
// require('express-async-errors')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
      return response.status(400).send({ error: error.message });
    }
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).send({ error: 'Invalid session. Please log in again.' });
    }
    if (error.name === 'TypeError' && error.message === "Cannot read properties of null (reading 'id')") {
      return response.status(401).send({ error: 'Invalid session. Please log in again.' });
    }
    next(error);
};

const userExtractor = async (request, response, next) => { // Session check should be done here
    const authorization = request.get('authorization');
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7);
    }
    if (!token) {
      request.user = null;
      next();
      return;
    }
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded || !decoded.id) {
      request.user = null;
      next();
      return;
    }
    const user = await User.findById(decoded.id);
    request.user = user;
    next();
};

module.exports = {
    userExtractor,
    errorHandler,
};
