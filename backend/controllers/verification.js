const verificationRouter = require('express').Router();
const crypto = require('crypto');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');
require('express-async-errors');
const { sendVerificationEmail } = require('../utils/email');

verificationRouter.get('/:code', async (request, response) => {
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

verificationRouter.post('/', userExtractor, async (request, response) => {
    const { user } = request;
    if (user.verified) {
      response.status(400).json({ error: 'User already verified' });
      return;
    }
    user.verificationCode = crypto.randomBytes(25).toString('hex');
    await user.save();
    sendVerificationEmail(user.email, user.verificationCode);
    response.redirect(200, '/');
});

module.exports = verificationRouter;
