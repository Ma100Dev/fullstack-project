const messageRouter = require('express').Router();
const Message = require('../models/message');
const Conversation = require('../models/conversation');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');

messageRouter.post('/', userExtractor, async (request, response) => {
    const { body } = request;
    const conversation = await Conversation.findById(body.conversation).populate('property')
      .populate('starter')
      .populate('receiver');
    const receiver = conversation.starter.id === request.user.id
      ? conversation.receiver.id : conversation.starter.id;

    const message = new Message({
        content: body.content,
        sender: request.user.id,
        receiver: receiver.id,
        conversation: conversation.id,
    });
    const saved = await message.save();
    response.json(saved);
});

module.exports = messageRouter;
