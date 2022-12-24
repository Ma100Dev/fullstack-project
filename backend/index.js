const http = require('http');
const createApp = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

createApp().then((app) => {
    http.createServer(app);
    const { PORT } = config;
    app.listen(PORT, () => {
        logger.log(`Server running on port ${PORT}`);
    });
});
