const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { isCorrectPassword } = require('../utils/password');

loginRouter.post('/', async (request, response) => {
    const { body } = request;
    if (!(body.username && body.password)) {
      return response.status(400).json({
          error: 'username and password required',
      });
    }
    const { passwordCorrect, user } = await isCorrectPassword({ body, response });
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
