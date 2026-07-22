import { createServer } from 'node:http';
import { createApplication } from './app.js';
import { config } from './config.js';
import * as db from './db.js';
import connectDB from './mongo.js';

await connectDB(config.mongoUrl);

const yoga = createApplication({
  adminToken: config.adminToken,
  corsOrigins: config.frontendOrigins,
  database: db,
  isProduction: config.nodeEnv === 'production',
});

const server = createServer(yoga);

server.listen(config.port, config.host, () => {
  console.info(
    `GraphQL API listening on http://${config.host}:${config.port}/graphql`,
  );
});
