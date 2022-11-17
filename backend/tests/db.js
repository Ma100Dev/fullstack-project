const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connect = async (mongod) => {
    const uri = mongod.getUri();
    console.log('DB URI: ', uri);
    mongoose.connect(uri);
};

const close = async (mongod) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

const clear = async () => {
    const { collections } = mongoose.connection;
    collections.map(async (collection) => {
        await collection.deleteMany();
    });
};

const init = async () => {
    const mongod = await MongoMemoryServer.create({});
    await connect(mongod);
    return mongod;
};

module.exports = {
    init,
    connect,
    close,
    clear,
};
