const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');
const { decrypt } = require('../utils/cryptography');

loginRouter.post('/', async (request, response) => {
    const { body } = request;
    const user = await User.findOne({ username: body.username });
    const password = decrypt(
      body.password,
    ).message;
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
          error: 'invalid username or password',
      });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jwt.sign(userForToken, config.JWT_SECRET);
    response
      .status(200)
      .send({ token, id: user.toJSON().id });
});

// TODO: Server-side session management

module.exports = loginRouter;
