const express = require('express');
const userManagement = require('express-user-management');
const config = require('./utils/config');

const app = express();

const options = {
    adapter: 'passport-mongo',
    usersTable: 'users',
    mongoUrl: config.MONGODB_URI,
    nodeMailerConfig: undefined,
    activationRequired: false,
    secret: config.SECRET,
};

userManagement.init(app, options);

app.use(express.json());

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}!`);
});
