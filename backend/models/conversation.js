const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    starter: { // The user who started the conversation
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: { // Always the owner of the property
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

conversationSchema.index({ property: 1, starter: 1 }, { unique: true });

conversationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const deepPopulate = require('mongoose-deep-populate')(mongoose);

conversationSchema.plugin(deepPopulate);

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
