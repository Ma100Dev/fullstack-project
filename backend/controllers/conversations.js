const conversationRouter = require('express').Router();
const Conversation = require('../models/conversation');
const Property = require('../models/property');
const { userExtractor } = require('../utils/middleware');

conversationRouter.get('/', userExtractor, async (request, response) => {
    response.json(await Conversation.find({
        $or: [{ starter: request.user.id }, { receiver: request.user.id }],
    })
      .populate('starter')
      .populate('receiver')
      .deepPopulate('messages.sender property.owner'));
});

conversationRouter.get('/:property', userExtractor, async (request, response) => {
    const property = await Property.findById(request.params.property);
    const conversation = await Conversation.findOne({
        $and: [
          { property: property.id },
          { starter: request.user.id },
        ],
    })
      .populate('property')
      .populate('starter')
      .populate('receiver')
      .deepPopulate('messages.sender property.owner');
    response.json(conversation);
});

conversationRouter.post('/', userExtractor, async (request, response) => {
    const { property } = request.body;
    const propertyObject = await Property.findById(property).populate('owner');
    if (propertyObject.owner.id === request.user.id) {
      return response.status(400).json({ error: 'You cannot message yourself' });
    }
    const conversation = new Conversation({
        starter: request.user.id,
        receiver: propertyObject.owner.id,
        property: propertyObject.toJSON().id,
        startedAt: Date.now(),
        messages: [],
    });
    const savedConversation = await conversation.save();
    response.status(201).json(savedConversation);
});

module.exports = conversationRouter;
