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

    // This check could be better
    if (!body.pricePer) {
      return response.status(400).json({ error: 'Property validation failed: pricePer: Path `pricePer` is required.' });
    }
    if (!['night', 'week', 'month', 'year', 'day', 'hour', 'weekend'].includes(body.pricePer)) {
      return response.status(400).json({ error: `Property validation failed: pricePer: \`${body.pricePer}\` is not a valid enum value for path \`pricePer\`.` });
    }
    if (body.pricePer !== 'day' && body.allowCalendarBooking === 'true') {
      return response.status(400).json({ error: 'Calendar booking is only implemented for day-by-day reservations' });
    }

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
        image: (request?.file ? { data: new Buffer.from(request.file.buffer, 'base64'), contentType: request.file.mimetype } : null),
    });
    await User.findOneAndUpdate({ _id: request.user.id }, { $push: { properties: property.id } });
    const saved = await property.save();
    response.status(201).json(saved);
});

propertyRouter.get('/', userExtractor, async (request, response) => {
    const page = Number(request.query.page || 1);
    const limit = Number(request.query.limit || 10);
    if (Number.isNaN(limit) || limit > 100 || limit < 1) {
      return response.status(400).json({ error: 'limit must be between 1 and 100' });
    }
    if (Number.isNaN(page) || page < 1) {
      return response.status(400).json({ error: 'page must be greater than 0' });
    }
    const properties = await Property.paginate(
      {
          owner: { $ne: request?.user?.id || null },
      },
      {
          page,
          limit,
          populate: [
            { path: 'owner', select: { username: 1, name: 1 } },
            { path: 'reservations', select: { startDate: 1, endDate: 1 } },
          ],
      },
    );
    response.json(properties);
});

propertyRouter.get('/:id', async (request, response) => {
    const property = await Property.findById(request.params.id)
      .populate('owner', { username: 1, name: 1 })
      .populate('reservations', { startDate: 1, endDate: 1 });
    if (property) {
      response.json(property);
    } else {
      response.status(404).json({ error: 'Property not found' }).end();
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
    const property = await Property.findById(request.params.id);
    const invalid = property.reservations.some((rsv) => {
        const startDate = new Date(rsv.startDate);
        const endDate = new Date(rsv.endDate);
        return reservation.startDate <= endDate && startDate <= reservation.endDate;
    });
    if (invalid) {
      return response.status(400).json({ error: 'Reservation overlaps with existing reservation' });
    }
    const saved = await reservation.save();
    property.reservations = property.reservations.concat(saved.id);
    await property.save();
    response.status(201).json(saved);
});

module.exports = propertyRouter;
