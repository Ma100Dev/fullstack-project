const messageRouter = require('express').Router();
const Message = require('../models/message');
const User = require('../models/user');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');

messageRouter.post('/', userExtractor, async (request, response) => {
    const { body } = request;
    const message = new Message({
        content: body.content,
        sender: request.user.id,
        receiver: body.receiver,
        property: body.property,
    });
    const receiver = await User.findById(body.receiver).populate('properties');
    if (!receiver) {
      return response.status(400).json({ error: 'Receiver does not exist' });
    }
    if (receiver.properties.find((property) => property.id === body.property)) {
      return response.status(400).json({ error: 'Property does not exist or is not owned by receiver' });
    }
    const saved = await message.save();
    response.json(saved);
});

messageRouter.get('/', userExtractor, async (request, response) => {
    response.json(
      await Message.find({ $or: [{ receiver: request.user.id }, { sender: request.user.id }] }),
    );
});

module.exports = messageRouter;