# Environment variables:
Environment variables are used to configure the backend. They can be easily set up using a .env file. The following variables are available:

Variable | Description
---|---
`PORT` | The port the backend will listen on. Defaults to `3000`.
`MONGO_URL` | The URL of the MongoDB database. No default.
`JWT_SECRET` | The secret used to sign JWT tokens. No default.
`NODE_ENV` | The environment the backend is running in. Defaults to `development`. Set to `production` to enable production mode, for example.
`POPULATE_DB` | Whether to populate the database with dummy data. Defaults to `false`, set to `true` to enable.
`NO_RUN` | Disables the backend from running for CI/CD, etc. Defaults to `false`.
`LOG_REQUESTS` | Whether to log requests. Defaults to `true` if `NODE_ENV` is `development`, otherwise to `false`.
`MEMORYDB_PORT` | The port the memory database will listen on. Defaults to a random port. Only used in development mode.

Files id_rsa and id_rsa.pub are required and must provide a valid RSA key pair. One can be generated using the following command:
`yarn run generateKeys`