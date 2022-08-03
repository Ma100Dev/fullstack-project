const propertyRouter = require('express').Router();
const Property = require('../models/property');
const User = require('../models/user');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');

propertyRouter.post('/', userExtractor, async (request, response) => {
    const { body } = request;
    const property = new Property({
        title: body.title,
        address: body.address,
        price: Number(body.price),
        beds: Number(body.beds),
        description: body.description,
        petsAllowed: body.petsAllowed === 'true',
        owner: request.user.id,
    });
    await User.findOneAndUpdate({ _id: request.user.id }, { $push: { properties: property.id } });
    const saved = await property.save();
    response.json(saved);
});

propertyRouter.get('/', async (request, response) => {
    response.json(await Property.find({}));
});

module.exports = propertyRouter;
