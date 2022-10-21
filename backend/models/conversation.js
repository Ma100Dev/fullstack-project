const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    starter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Message',
      },
    ],
});

conversationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
