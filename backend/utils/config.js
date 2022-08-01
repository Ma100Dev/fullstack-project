require('dotenv').config();

const { MONGODB_URI, JWT_SECRET } = process.env;
const PORT = process.env.PORT || 3001;
const ENV = process.env.ENV || 'development';

module.exports = {
    MONGODB_URI,
    JWT_SECRET,
    PORT,
    ENV,
};
