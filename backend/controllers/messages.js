const messageRouter = require('express').Router();
const Message = require('../models/message');
const Property = require('../models/property');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');

messageRouter.post('/', userExtractor, async (request, response) => { // This is completely broken. I need to fix it.
    const { body } = request;
    const property = await Property.findById(body.property).populate('owner');
    if (!property) {
      return response.status(400).json({ error: 'Receiver does not exist' });
    }
    let receiver;
    if (receiver._id.toString() === request.user._id.toString()) {
      receiver = null; // TODO: This is a hack, fix it
    } else {
      receiver = property.owner;
    }
    const message = new Message({
        content: body.content,
        sender: request.user.id,
        receiver: receiver.id,
        property: body.property,
    });
    const saved = await message.save();
    response.json(saved);
});

messageRouter.get('/', userExtractor, async (request, response) => {
    response.json(
      await Message.find({ $or: [{ receiver: request.user.id }, { sender: request.user.id }] })
        .populate('sender', { username: 1, name: 1 })
        .populate('receiver', { username: 1, name: 1 })
        .populate('property', { title: 1 }),
    );
});

module.exports = messageRouter;
