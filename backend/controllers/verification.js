const verificationRouter = require('express').Router();
const User = require('../models/user');
require('express-async-errors');

verificationRouter.post('/:code', async (request, response) => {
    const { code } = request.params;
    const userFromDb = await User.findOne({ verificationCode: code });
    if (userFromDb.verified) {
      response.status(400).json({ error: 'User already verified' });
      return;
    }
    userFromDb.verified = true;
    userFromDb.verificationCode = null;
    await userFromDb.save();
    response.status(200).json({ message: 'User verified' });
});

module.exports = verificationRouter;
