const { createProxyMiddleware } = require('http-proxy-middleware');

let middleware;
if (process.env.NODE_ENV !== 'development') {
    //eslint-disable-next-line
    middleware = function (app) { };
} else {
     middleware = function (app) {
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://localhost:3001',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': '/',
                },
            })
        );
    };

}


module.exports = middleware;