const propertyRouter = require('express').Router();
const Property = require('../models/property');
const User = require('../models/user');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');
const { upload } = require('../utils/multer');
const logger = require('../utils/logger');

propertyRouter.post('/', upload.single('image'), userExtractor, async (request, response) => {
    const { body } = request;
    console.log(JSON.stringify(body, null, 2));
    logger.log(Number(body.beds));
    const property = new Property({
        title: body.title,
        address: body.address,
        price: Number(body.price),
        beds: Number(body.beds),
        description: body.description,
        petsAllowed: body.petsAllowed === 'true',
        owner: request.user.id,
        // eslint-disable-next-line new-cap
        image: { data: new Buffer.from(request.file.buffer, 'base64'), contentType: request.file.mimetype },
    });
    await User.findOneAndUpdate({ _id: request.user.id }, { $push: { properties: property.id } });
    const saved = await property.save();
    response.json(saved);
});

propertyRouter.get('/', async (request, response) => {
    response.json(await Property.find({}));
});

module.exports = propertyRouter;
