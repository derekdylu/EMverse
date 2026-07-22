import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const backendRoot = fileURLToPath(new URL('../', import.meta.url));

dotenv.config({
  path: [path.join(backendRoot, '.env'), path.join(backendRoot, '.env.defaults')],
  quiet: true,
});

function parsePort(value) {
  const port = Number.parseInt(value, 10);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }
  return port;
}

function parseOrigins(value) {
  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    throw new Error('FRONTEND_ORIGIN must contain at least one origin.');
  }

  return origins;
}

export const config = Object.freeze({
  adminToken: process.env.ADMIN_TOKEN?.trim() || null,
  frontendOrigins: parseOrigins(process.env.FRONTEND_ORIGIN),
  host: process.env.HOST,
  mongoUrl: process.env.MONGO_URL,
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parsePort(process.env.PORT),
});
