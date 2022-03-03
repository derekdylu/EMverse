import { GraphQLServer, PubSub } from 'graphql-yoga';
import connectDB from './mongo';
import * as db from './db';

import Query from './Resolvers/Query';
import Mutation from './Resolvers/Mutation';
// import Subscription from './resolvers/Subscription';
import Post from './Resolvers/Post';
import EmotionResolver from "./Resolvers/Emotion";

connectDB();

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: { 
        Query,
        Mutation,
        // Subscription,
        Post,
        Emotion: EmotionResolver,
    },
    cors: {
        origin: '*',
        credentials: true,
    },
    context: { db, pubsub },
});

server.start({ port: process.env.PORT | 5000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});