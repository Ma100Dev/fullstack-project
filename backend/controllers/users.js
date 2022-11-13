const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
require('../models/property');
const crypto = require('crypto');
const User = require('../models/user');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');
const { decrypt } = require('../utils/cryptography');

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
        verified: false,
        verificationCode: crypto.randomBytes(25).toString('hex'),
    });

    const savedUser = await user.save();
    response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('properties', {
        id: 1, address: 1, price: 1, beds: 1, description: 1, petsAllowed: 1, title: 1, image: 1,
    });
    response.json(users.map((user) => user.toJSON()));
});

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
