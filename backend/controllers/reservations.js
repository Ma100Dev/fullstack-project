const reservationRouter = require('express').Router();

const Reservation = require('../models/reservation');
const Property = require('../models/property');
const { userExtractor } = require('../utils/middleware');

reservationRouter.get('/', userExtractor, async (request, response) => {
    const reservations = await Reservation.find({ user: request.user.id })
      .populate('property');
    response.json(reservations);
});

reservationRouter.get('/myProperties', userExtractor, async (request, response) => {
    const properties = await Property.find({ owner: request.user.id });
    const reservations = await Reservation.find({ property: { $in: properties.map((p) => p.id) } });
    response.json(reservations);
});

module.exports = reservationRouter;
