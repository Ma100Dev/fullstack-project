const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    properties: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Property',
      },
    ],
});
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        if (returnedObject._id) {
          returnedObject.id = returnedObject._id.toString();
        } else {
          returnedObject.id = returnedObject.id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
