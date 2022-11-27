const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
require('../models/property');
const User = require('../models/user');
const Message = require('../models/message');
const Conversation = require('../models/conversation');
const Property = require('../models/property');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');
const { decrypt } = require('../utils/cryptography');

// TODO: Email verification
usersRouter.post('/', async (request, response) => {
    const { body } = request;
    const password = decrypt(
      body.password,
    ).message;
    if (password) {
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
    response.json(savedUser);
});

// Should only be allowed for admins
// TODO: Add admins
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
    // TODO: Add password confirmation to delete
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
    await Message.find({ $or: [{ sender: id }, { receiver: id }] }).deleteMany();
    await Conversation.find({ $or: [{ starter: id }, { receiver: id }] }).deleteMany();
    await Property.find({ owner: id }).deleteMany();
    await User.findByIdAndRemove(id);
    // TODO: Should probably keep the user in the database, but mark it as deleted
    // This contributes to abuse prevention and ux for other users
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
