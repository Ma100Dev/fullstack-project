const messageRouter = require('express').Router();
const Message = require('../models/message');
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
    // TODO check if property exists and is owned by receiver and all validation
    const saved = await message.save();
    response.json(saved);
});

messageRouter.get('/', userExtractor, async (request, response) => {
    response.json(
      await Message.find({ $or: [{ receiver: request.user.id }, { sender: request.user.id }] }),
    );
});

module.exports = messageRouter;
