require('dotenv').config();

const { MONGODB_URI, JWT_SECRET } = process.env;
const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || 'development';
const POPULATE_DB = process.env.POPULATE_DB?.toLowerCase() === 'true' || false;
const NO_RUN = process.env.NO_RUN?.toLowerCase() === 'true' || false;
const MEMORYDB_PORT = process.env?.MEMORYDB_PORT && Number(process.env.MEMORYDB_PORT);

module.exports = {
    MONGODB_URI,
    JWT_SECRET,
    PORT,
    ENV,
    POPULATE_DB,
    NO_RUN,
    MEMORYDB_PORT,
};
