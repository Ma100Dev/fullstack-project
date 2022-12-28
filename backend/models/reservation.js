const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({ // Should probably be validated more thoroughly
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
});

reservationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
