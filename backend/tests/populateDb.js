const { faker } = require('@faker-js/faker');

const User = require('../models/user');

const populateUsers = async (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
      const user = new User({
          username: faker.helpers.unique(faker.internet.userName),
          name: faker.name.fullName(),
          email: faker.helpers.unique(faker.internet.email),
          passwordHash: '$2a$10$BWybLp0dsP/XzUOoMIeUY.Mv.K15jkkx2/q1F1vwf3/gBgr00WP2y',
          properties: [],
          // verified: true, // Add back in when email verification is implemented
      });
        // eslint-disable-next-line no-await-in-loop
      await user.save();
      users.push(user);
    }
    return users;
};

module.exports = {
    populateUsers,
};
