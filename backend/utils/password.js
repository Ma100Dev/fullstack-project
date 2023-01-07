const bcrypt = require('bcrypt');
const { decrypt } = require('./cryptography');
const { ENV } = require('./config');
const User = require('../models/user');

// This is a total mess, but it works most of th time. I'll clean it up later.
// TODO: Clean up this mess
const isCorrectPassword = async (
  {
      body,
      response,
      usernameField = 'username',
      passwordField = 'password',
      username,
  },
) => {
    if (!username) username = body[usernameField]; // Suboptimal, but it works
    const user = await User.findOne({ username });
    let password;
    if (ENV === 'test' && body.ignoreCrypt === true) {
      password = body.password;
    } else {
      try {
        password = decrypt(
          body[passwordField],
        ).message;
      } catch (error) {
        response.status(400).json({ error: 'Invalid password' }).end();
        return;
      }
    }
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);
    return { passwordCorrect, user };
};

module.exports = {
    isCorrectPassword,
};
