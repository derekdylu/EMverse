import { readFileSync } from 'node:fs';
import { maxAliasesPlugin } from '@escape.tech/graphql-armor-max-aliases';
import { maxDepthPlugin } from '@escape.tech/graphql-armor-max-depth';
import { maxTokensPlugin } from '@escape.tech/graphql-armor-max-tokens';
import {
  createPubSub,
  createSchema,
  createYoga,
} from 'graphql-yoga';
import { GraphQLScalarType, Kind } from 'graphql';
import Mutation from './Resolvers/Mutation.js';
import Post from './Resolvers/Post.js';
import Query from './Resolvers/Query.js';
import Subscription from './Resolvers/Subscription.js';

const typeDefs = readFileSync(
  new URL('./schema.graphql', import.meta.url),
  'utf8',
);

function parseDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Date cannot represent an invalid value.');
  }
  return date;
}

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new TypeError('Date cannot represent an invalid value.');
    }
    return date.toISOString();
  },
  parseValue(value) {
    return parseDate(value);
  },
  parseLiteral(node) {
    if (node.kind !== Kind.STRING) {
      throw new TypeError('Date must be provided as an ISO-8601 string.');
    }
    return parseDate(node.value);
  },
});

const schema = createSchema({
  typeDefs,
  resolvers: {
    Date: DateScalar,
    Mutation,
    Post,
    Query,
    Subscription,
  },
});

export function createApplication({
  adminToken = null,
  corsOrigins = ['http://localhost:3000'],
  database,
  isProduction = false,
  pubSub = createPubSub(),
}) {
  return createYoga({
    schema,
    graphqlEndpoint: '/graphql',
    context: ({ request }) => ({
      adminToken,
      db: database,
      pubSub,
      request,
    }),
    cors: {
      origin: corsOrigins,
      credentials: false,
      methods: ['GET', 'POST', 'OPTIONS'],
    },
    graphiql: !isProduction,
    maskedErrors: isProduction,
    plugins: [
      maxDepthPlugin({ n: 8, exposeLimits: false }),
      maxTokensPlugin({ n: 1_000, exposeLimits: false }),
      maxAliasesPlugin({ n: 15, exposeLimits: false }),
    ],
  });
}
