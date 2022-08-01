const http = require('http');
const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

http.createServer(app);
const { PORT } = config;
app.listen(PORT, () => {
    logger.log(`Server running on port ${PORT}`);
});
