const propertyRouter = require('express').Router();
const Property = require('../models/property');
const User = require('../models/user');
const Reservation = require('../models/reservation');
require('express-async-errors');
const { userExtractor } = require('../utils/middleware');
const { upload } = require('../utils/multer');
const logger = require('../utils/logger');

propertyRouter.post('/', upload.single('image'), userExtractor, async (request, response) => {
    const { body } = request;
    logger.log(Number(body.beds));
    const property = new Property({
        title: body.title,
        address: body.address,
        price: Number(body.price),
        pricePer: body.pricePer,
        beds: Number(body.beds),
        description: body.description,
        petsAllowed: body.petsAllowed === 'true',
        owner: request.user.id,
        allowCalendarBooking: body.allowCalendarBooking === 'true',
        // eslint-disable-next-line new-cap
        image: { data: new Buffer.from(request.file.buffer, 'base64'), contentType: request.file.mimetype },
    });
    await User.findOneAndUpdate({ _id: request.user.id }, { $push: { properties: property.id } });
    const saved = await property.save();
    response.json(saved);
});

propertyRouter.get('/', userExtractor, async (request, response) => {
    const page = request.query.page || 1;
    const limit = request.query.limit || 10;
    if (limit > 100) {
      return response.status(400).json({ error: 'limit must be less than or equal 100' });
    }
    const properties = await Property.paginate(
      {
          owner: { $ne: request?.user?.id || null },
      },
      {
          page,
          limit,
          populate: { path: 'owner', select: { username: 1, name: 1 } },
      },
    );
    response.json(properties);
});

propertyRouter.get('/:id', async (request, response) => {
    const property = await Property.findById(request.params.id).populate('owner', { username: 1, name: 1 });
    if (property) {
      response.json(property);
    } else {
      response.status(404).end();
    }
});

propertyRouter.post('/:id/reservations', userExtractor, async (request, response) => {
    const { body } = request;
    const reservation = new Reservation({
        property: request.params.id,
        user: request.user.id,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
    });
    const saved = await reservation.save();
    response.status(201).json(saved);
});

module.exports = propertyRouter;
