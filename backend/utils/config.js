require('dotenv').config();

const { MONGODB_URI, JWT_SECRET } = process.env;
const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || 'development';
const POPULATE_DB = process.env.POPULATE_DB?.toLowerCase() === 'true' || false;

module.exports = {
    MONGODB_URI,
    JWT_SECRET,
    PORT,
    ENV,
    POPULATE_DB,
};
