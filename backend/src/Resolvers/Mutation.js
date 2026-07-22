import { GraphQLError } from 'graphql';
import { requireAdmin } from '../auth.js';

const MAX_POST_LENGTH = 500;

function invalidPost(message) {
  return new GraphQLError(message, {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}

const Mutation = {
  async createPost(parent, { emotion, text }, { db, pubSub }) {
    const normalizedText = typeof text === 'string' ? text.trim() : '';

    if (!normalizedText) {
      throw invalidPost('Post text cannot be empty.');
    }
    if (normalizedText.length > MAX_POST_LENGTH) {
      throw invalidPost(`Post text cannot exceed ${MAX_POST_LENGTH} characters.`);
    }

    const post = await db.Post.create({
      emotion,
      text: normalizedText,
      is_visible: true,
    });

    pubSub.publish(`post:${emotion}`, {
      mutation: 'CREATED',
      post,
    });

    return post;
  },

  async updatePost(parent, { id }, { adminToken, db, request }) {
    requireAdmin(request, adminToken);

    const post = await db.Post.findById(id);
    if (!post) {
      throw new GraphQLError('Post not found.', {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    post.is_visible = !post.is_visible;
    await post.save();
    return id;
  },
};

export default Mutation;
