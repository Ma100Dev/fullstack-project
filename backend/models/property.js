const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const propertySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
    },
    address: {
        type: String,
        required: true,
        minLength: 8,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    priceType: {
        type: String,
        required: true,
        enum: ['night', 'week', 'month', 'year', 'day', 'hour', 'weekend'],
    },
    beds: {
        type: Number,
        required: true,
        min: 1,
    },
    description: {
        type: String,
        required: true,
        minLength: 50,
    },
    petsAllowed: {
        type: Boolean,
        required: true,
    },
    image:
    {
        data: Buffer,
        contentType: String,
    },
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
propertySchema.plugin(uniqueValidator);

propertySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

propertySchema.plugin(mongoosePaginate);

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
