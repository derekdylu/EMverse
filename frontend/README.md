# em-verse frontend

The frontend is a Vite-powered React 17 application. Project-wide setup, configuration, test, and build instructions are maintained in the [root README](../README.md).

From the repository root:

```bash
yarn frontend
yarn workspace @em-verse/frontend test --run
yarn workspace @em-verse/frontend build
```

Set `VITE_GRAPHQL_URL` only to a public GraphQL endpoint. Never place database credentials or administrator tokens in a `VITE_` variable because Vite embeds those values into browser assets.
