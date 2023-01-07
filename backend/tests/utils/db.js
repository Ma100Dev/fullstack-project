const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MEMORYDB_PORT } = require('../../utils/config');
const logger = require('../../utils/logger');

let localMongod;

const connect = async (mongod) => {
    const uri = mongod.getUri();
    logger.log('DB URI: ', uri);
    mongoose.connect(uri);
};

const close = async (mongod) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop({
        force: true,
        doCleanup: true,
    });
};

const clear = async () => {
    const { db } = mongoose.connection;
    const collections = await db.listCollections().toArray();
    collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
          await db.dropCollection(collectionName);
      });
};

const init = async () => {
    const mongod = await MongoMemoryServer.create({
        instance: {
            port: MEMORYDB_PORT,
            storageEngine: 'ephemeralForTest',
        },
    });
    await connect(mongod);
    localMongod = mongod;
    return mongod;
};

/** @deprecated Not recommended to use. Store the result of `init()` instead.  */
const getLocalMongod = () => localMongod;

module.exports = {
    init,
    connect,
    close,
    clear,
    getLocalMongod,
};
