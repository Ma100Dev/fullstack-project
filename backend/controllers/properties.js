const propertyRouter = require('express').Router();
const Property = require('../models/property');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');

propertyRouter.post('/', userExtractor, async (request, response) => {
    const { body } = request;
    const user = new Property({
        address: body.address,
        price: Number(body.price),
        beds: Number(body.beds),
        description: body.description,
        petsAllowed: body.petsAllowed === 'true',
        owner: request.user.id,
    });
    const savedUser = await user.save();
    response.json(savedUser);
});

propertyRouter.get('/', async (request, response) => {
    response.json(await Property.find({}));
});

module.exports = propertyRouter;
