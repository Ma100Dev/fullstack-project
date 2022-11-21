const { faker } = require('@faker-js/faker');

const User = require('../models/user');
const Property = require('../models/property');
const Conversation = require('../models/conversation');

const populateUsers = async (count) => {
    const users = [];
    const passwordHash = '$2a$10$BWybLp0dsP/XzUOoMIeUY.Mv.K15jkkx2/q1F1vwf3/gBgr00WP2y'; // password

    const defaultUser = new User({
        username: 'test',
        name: 'Test User',
        email: 'test@example.com',
        passwordHash,
        properties: [],
    });
    await defaultUser.save();

    for (let i = 0; i < count; i++) {
      const user = new User({
          username: faker.helpers.unique(faker.internet.userName),
          name: faker.name.fullName(),
          email: faker.helpers.unique(faker.internet.email),
          passwordHash,
          properties: [],
          // verified: true, // Add back in when email verification is implemented
      });

      await user.save();
      users.push(user);
    }
    return users;
};

const populateProperties = async (count) => {
    const properties = [];
    const users = (await User.find({}).select('_id')).map((user) => user._id.toString());
    for (let i = 0; i < count; i++) {
      const property = new Property({
          title: faker.helpers.unique(faker.lorem.words),
          address: faker.address.streetAddress(),
          price: faker.datatype.number({
              min: 100,
              max: 1000000,
          }),
          beds: faker.datatype.number({
              min: 1,
              max: 10,
          }),
          description: faker.lorem.paragraph(),
          petsAllowed: faker.datatype.boolean(),
          owner: faker.helpers.arrayElement(users),
          image: null,
      });

      await property.save();
      properties.push(property);
      await User.findOneAndUpdate({ _id: property.owner }, { $push: { properties: property.id } });
    }
    return properties;
};

const populateConversations = async (count) => {
    const conversations = [];
    const properties = await Property.find({}).select('_id').populate('owner');
    const users = (await User.find({}).select('_id')).map((user) => user._id.toString());
    for (let i = 0; i < count; i++) {
      const property = faker.helpers.arrayElement(properties);
      const conversation = new Conversation({
          property: property._id,
          starter: faker.helpers.arrayElement(users, {
              options: {
                  exclude: [property.owner._id.toString()],
              },
          }),
          receiver: property.owner._id,
          messages: [],
      });
      await conversation.save();
      conversations.push(conversation);
    }
    return conversations;
};

module.exports = {
    populateUsers,
    populateProperties,
    populateConversations,
};
