import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createApplication } from '../src/app.js';

function createDatabase() {
  const posts = [];

  return {
    posts,
    Post: {
      async create(input) {
        const post = {
          ...input,
          id: String(posts.length + 1),
          created_at: new Date('2022-01-01T00:00:00.000Z'),
          async save() {},
        };
        posts.push(post);
        return post;
      },
      async countDocuments() {
        return 0;
      },
      async findById(id) {
        return posts.find((post) => post.id === id) || null;
      },
      find() {
        return {
          sort() {
            return {
              async limit() {
                return posts;
              },
            };
          },
        };
      },
    },
  };
}

async function execute(yoga, query, variables, headers = {}) {
  const response = await yoga.fetch('http://em-verse.test/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

test('rejects empty and oversized anonymous posts', async () => {
  const database = createDatabase();
  const yoga = createApplication({ database });
  const mutation = `
    mutation CreatePost($text: String!) {
      createPost(emotion: HAHA, text: $text) { id }
    }
  `;

  const empty = await execute(yoga, mutation, { text: '   ' });
  assert.equal(empty.errors[0].extensions.code, 'BAD_USER_INPUT');

  const oversized = await execute(yoga, mutation, { text: 'x'.repeat(501) });
  assert.equal(oversized.errors[0].extensions.code, 'BAD_USER_INPUT');
  assert.equal(database.posts.length, 0);
});

test('creates normalized posts and hides admin mutations by default', async () => {
  const database = createDatabase();
  const yoga = createApplication({ database });

  const created = await execute(
    yoga,
    `mutation { createPost(emotion: SAD, text: "  hello  ") { id text } }`,
  );
  assert.deepEqual(created.data.createPost, { id: '1', text: 'hello' });

  const update = await execute(
    yoga,
    `mutation { updatePost(id: "1") }`,
  );
  assert.equal(update.errors[0].extensions.code, 'FORBIDDEN');
  assert.equal(database.posts[0].is_visible, true);
});

test('requires the configured bearer token for moderation', async () => {
  const database = createDatabase();
  const yoga = createApplication({
    adminToken: 'test-admin-token',
    database,
  });

  await execute(
    yoga,
    `mutation { createPost(emotion: WOW, text: "hello") { id } }`,
  );
  const update = await execute(
    yoga,
    `mutation { updatePost(id: "1") }`,
    undefined,
    { authorization: 'Bearer test-admin-token' },
  );

  assert.equal(update.data.updatePost, '1');
  assert.equal(database.posts[0].is_visible, false);
});

test('rejects documents with excessive aliases', async () => {
  const database = createDatabase();
  const yoga = createApplication({ database });
  const fields = Array.from(
    { length: 16 },
    (_, index) => `count${index}: emotionsCount`,
  ).join('\n');

  const result = await execute(yoga, `query { ${fields} }`);
  assert.ok(result.errors?.length > 0);
});
