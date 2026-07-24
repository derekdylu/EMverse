# EMverse

<img width="1946" height="1117" alt="MacBook Pro 16_ - 17" src="https://github.com/user-attachments/assets/72503096-cb35-4d0b-bd0a-beffe4ce72de" />

em-verse is an experimental full-stack emotion-sharing wall. Visitors can post a short message, associate it with one of six emotions, and explore the visible messages through an animated React interface.

The interface is primarily written in Traditional Chinese.

## Features

- Six emotion categories: joy, anger, sadness, surprise, fear, and disgust.
- Anonymous messages with a 500-character server-side limit.
- Animated emotion visualization built with React, p5.js, Matter.js, and Lottie.
- GraphQL API backed by MongoDB.
- Moderation mutation that is disabled unless an administrator token is configured.
- GraphQL query depth, token, and alias limits.

## Requirements

- Node.js 20.19 or newer. Node.js 22 or 24 is recommended.
- Corepack, which supplies the pinned Yarn 1.22.22 package manager.
- MongoDB available locally or through a service you control.

## Quick start

Enable the pinned package manager and install dependencies:

```bash
corepack enable
yarn install --frozen-lockfile
```

Create a private backend configuration file:

```bash
cp backend/.env.example backend/.env
```

The checked-in defaults connect only to `127.0.0.1`. Edit `backend/.env` if your MongoDB instance uses a different address.

Start the API in one terminal:

```bash
yarn server
```

Start the frontend in another terminal:

```bash
yarn frontend
```

Open [http://localhost:3000](http://localhost:3000). The GraphQL endpoint is available at `http://127.0.0.1:5000/graphql` in development.

## Configuration

Backend settings are loaded from `backend/.env`; safe local fallbacks live in `backend/.env.defaults`.

| Variable | Purpose | Safe local default |
| --- | --- | --- |
| `MONGO_URL` | MongoDB connection URI | `mongodb://127.0.0.1:27017/em_verse` |
| `HOST` | API bind address | `127.0.0.1` |
| `PORT` | API port | `5000` |
| `FRONTEND_ORIGIN` | Comma-separated allowed browser origins | Localhost and `127.0.0.1` on port `3000` |
| `ADMIN_TOKEN` | Bearer token for moderation | Empty; moderation disabled |
| `NODE_ENV` | Enables production error masking when set to `production` | `development` |

The frontend reads `VITE_GRAPHQL_URL` at build time and otherwise uses `http://127.0.0.1:5000/graphql`.

## Development

Run the automated checks:

```bash
yarn test
yarn build
yarn audit
```

The repository is a Yarn workspace:

```text
backend/   GraphQL Yoga API, MongoDB model, and Node tests
frontend/  Vite-powered React client and browser tests
```

## Deployment notes

The API binds to loopback by default. Changing `HOST` to a public interface is an explicit deployment decision. Before doing so, add infrastructure-level request rate limiting, TLS, logging with sensitive-data filtering, database least-privilege controls, backup and restore procedures, abuse moderation, and a deployment-specific CORS allowlist.

Do not put `ADMIN_TOKEN` in the frontend or any `VITE_` variable: Vite embeds those values in public browser assets.

## License

Code in this repository is available under the [MIT License](LICENSE). Before redistributing the image and animation assets, confirm that you have the necessary rights for your intended use; their provenance is not documented in this repository.
