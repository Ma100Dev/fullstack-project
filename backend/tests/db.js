const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const db = new MongoMemoryServer();

const connect = async () => {
    const uri = await db.getConnectionString();
    console.log('DB URI: ', uri);
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
    };
    mongoose.connect(uri, mongooseOpts);
};

const close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await db.stop();
};

const clear = async () => {
    const { collections } = mongoose.connection;
    collections.map(async (collection) => {
        await collection.deleteMany();
    });
};

module.exports = {
    connect,
    close,
    clear,
};
