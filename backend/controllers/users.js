const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
require('../models/property');
const User = require('../models/user');
const Message = require('../models/message');
const Conversation = require('../models/conversation');
const Property = require('../models/property');
const Archival = require('../models/archival');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');
const { decrypt } = require('../utils/cryptography');
const { ENV } = require('../utils/config');

// TODO: Email verification
usersRouter.post('/', async (request, response) => {
    const { body } = request;
    let password;
    if (ENV === 'test' && body?.ignoreCrypt === true) {
      password = body.password;
    } else {
      try {
        password = decrypt(
          body.password,
        ).message;
      } catch (error) {
        response.status(400).json({ error: 'Invalid password' }).end();
        return;
      }
    }
    if (!password) {
      response.status(400).json({ error: 'User validation failed: password: Path `password` is required.' });
      return;
    } if (password.length < 3) {
      response.status(400).json({ error: 'User validation failed: username: Path `password` is shorter than the minimum allowed length (3).' });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
        username: body.username,
        name: body.name,
        email: body.email,
        passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser).end();
});

// Should only be allowed for admins
// TODO: Add admins and admin UI
// usersRouter.get('/', async (request, response) => {
//     const users = await User.find({}).populate('properties', {
//         id: 1, address: 1, price: 1, beds: 1, description: 1, petsAllowed: 1, title: 1, image: 1,
//     });
//     response.json(users.map((user) => user.toJSON()));
// });

usersRouter.put('/:id', userExtractor, async (request, response) => {
    const { body } = request;
    const { user } = request;
    const { id } = request.params;
    if (id !== user.id) {
      response.status(401).json({ error: 'Not authorized' });
      return;
    }
    const password = decrypt(
      body.password,
    ).message;
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      response.status(401).json({ error: 'Incorrect password confirmation' });
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(id, {
        username: body.username,
        name: body.name,
        email: body.email,
    }, { new: true });
    response.json(updatedUser.toJSON());
});

usersRouter.delete('/:id', userExtractor, async (request, response) => {
    const { user } = request;
    const { id } = request.params;
    if (id !== user.id) {
      response.status(401).json({ error: 'Not authorized' });
      return;
    }
    // TODO: Add password confirmation to delete account
    // const { body } = request;
    // const password = decrypt(
    // body.password,
    // ).message;
    // const passwordCorrect = user === null
    // ? false
    // : await bcrypt.compare(password, user.passwordHash);
    // if (!passwordCorrect) {
    // response.status(401).json({ error: 'Incorrect password confirmation' });
    // return;
    // }
    const dbUser = await User.findById(id);
    const userCopy = { ...dbUser._doc };
    delete userCopy.passwordHash; // Don't need to archive the password hash

    const messages = await Message.find(
      { $or: [{ sender: id }, { receiver: id }] },
    );
    userCopy.messages = messages;
    await Message.deleteMany({ $or: [{ sender: id }, { receiver: id }] });

    const conversations = await Conversation.find({
        $or: [{ starter: id }, { receiver: id }],
    });
    userCopy.conversations = conversations;
    await Conversation.deleteMany({
        $or: [{ starter: id }, { receiver: id }],
    });

    const properties = await Property.find({ owner: id });
    delete userCopy.properties;
    userCopy.properties = properties;
    await Property.deleteMany({ owner: id });

    await new Archival({
        data: userCopy,
        archiveDate: Date.now(),
    }).save();

    await User.findByIdAndRemove(id);
    response.status(204).end();
});

usersRouter.get('/:id', async (request, response) => {
    const { id } = request.params;
    const user = await User.findById(id).populate('properties', {
        id: 1,
        address: 1,
        price: 1,
        beds: 1,
        description: 1,
        petsAllowed: 1,
        title: 1,
        image: 1,
    }).deepPopulate('properties.owner');
    response.json(user.toJSON());
});

module.exports = usersRouter;
