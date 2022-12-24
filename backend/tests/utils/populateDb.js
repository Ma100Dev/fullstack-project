const { faker } = require('@faker-js/faker');

const User = require('../../models/user');
const Property = require('../../models/property');
const Conversation = require('../../models/conversation');
const Message = require('../../models/message');

const passwordHash = '$2a$10$BWybLp0dsP/XzUOoMIeUY.Mv.K15jkkx2/q1F1vwf3/gBgr00WP2y'; // password
const populateUsers = async (count) => {
    const users = [];

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
          // Including an image would be unnecessary, slow down everything and use a lot of RAM
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
      properties.splice(properties.indexOf(property), 1);
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

const populateMessages = async (count) => {
    const messages = [];
    const conversations = await await Conversation.find({}).select('_id').populate('starter').populate('receiver');
    for (let i = 0; i < count; i++) {
      const conversation = faker.helpers.arrayElement(conversations);
      const users = faker.helpers.arrayElements(
        [conversation.starter._id, conversation.receiver._id],
        2,
      );
      const message = new Message({
          sender: users[0],
          receiver: users[1],
          content: faker.lorem.paragraph(),
          createdAt: faker.date.past(),
      });
      await message.save();
      messages.push(message);
      await Conversation.findOneAndUpdate(
        { _id: conversation._id },
        { $push: { messages: message.id } },
      );
    }
    return messages;
};

const generateDefaultUser = async () => { // Contains repeated code from other functions
    const defaultUser = new User({
        username: 'test',
        name: 'Test User',
        email: 'test@example.com',
        passwordHash,
        properties: [],
    });
    await defaultUser.save();

    // Generate 10 properties for the default user
    for (let i = 0; i < 10; i++) {
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
          owner: defaultUser._id,
          image: null,
      });
      await property.save();
      defaultUser.properties.push(property.id);
      await defaultUser.save();
    }

    // Generate 10 conversations for the default user
    const properties = [...defaultUser.properties];
    const conversations = [];
    for (let i = 0; i < 10; i++) {
      const property = faker.helpers.arrayElement(properties);
      properties.splice(properties.indexOf(property), 1);
      const conversation = new Conversation({
          property,
          starter: defaultUser._id,
          receiver: faker.helpers.arrayElement((await User.find({}).select('_id')).map((user) => user._id.toString()), {
              options: {
                  exclude: [defaultUser._id.toString()],
              },
          }),
          messages: [],
      });
      await conversation.save();
      conversations.push(conversation);
    }

    // Generate 10 messages for the default user
    for (let i = 0; i < 10; i++) {
      const conversation = faker.helpers.arrayElement(conversations);
      const users = faker.helpers.arrayElements(
        [conversation.starter, conversation.receiver],
        2,
      );
      const message = new Message({
          sender: users[0],
          receiver: users[1],
          content: faker.lorem.paragraph(),
          createdAt: faker.date.past(),
      });
      await message.save();
      await Conversation.findOneAndUpdate(
        { _id: conversation._id },
        { $push: { messages: message.id } },
      );
    }
    return defaultUser;
};

module.exports = {
    populateUsers,
    populateProperties,
    populateConversations,
    populateMessages,
    generateDefaultUser,
};
