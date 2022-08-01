const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const propertySchema = mongoose.Schema({
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
        delete returnedObject.owner;
    },
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;