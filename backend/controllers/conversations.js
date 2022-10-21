const conversationRouter = require('express').Router();
const Conversation = require('../models/conversation');
const Property = require('../models/property');
const { userExtractor } = require('../utils/middleware');

conversationRouter.get('/', userExtractor, async (request, response) => {
    response.json(await Conversation.find({
        $or: [{ starter: request.user.id }, { receiver: request.user.id }],
    })
      .populate('property')
      .populate('starter')
      .populate('receiver')
      .populate('messages'));
});

conversationRouter.post('/', userExtractor, async (request, response) => {
    const { property } = request.body;
    const propertyObject = await Property.findById(property).populate('owner');
    const conversation = new Conversation({
        starter: request.user.id,
        receiver: propertyObject.owner.id,
        property: property.id,
        messages: [],
    });
    const savedConversation = await conversation.save();
    response.status(201).json(savedConversation);
});

module.exports = conversationRouter;
