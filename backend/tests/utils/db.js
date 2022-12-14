const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MEMORYDB_PORT } = require('../../utils/config');

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
    const { db } = mongoose.connection;
    const collections = await db.listCollections().toArray();
    collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
          db.dropCollection(collectionName);
      });
};

const init = async () => {
    const mongod = await MongoMemoryServer.create({
        instance: {
            port: MEMORYDB_PORT,
        },
    });
    await connect(mongod);
    return mongod;
};

module.exports = {
    init,
    connect,
    close,
    clear,
};
