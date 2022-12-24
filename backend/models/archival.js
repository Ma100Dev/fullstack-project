const mongoose = require('mongoose');

// Should be accessible to admin only
// Archived items should get deleted after a certain amount of time
const archivalSchema = mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    archiveDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

archivalSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Archival = mongoose.model('Archival', archivalSchema);
module.exports = Archival;
