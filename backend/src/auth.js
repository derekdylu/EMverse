import { timingSafeEqual } from 'node:crypto';
import { GraphQLError } from 'graphql';

function forbidden() {
  return new GraphQLError('Administrative access is required.', {
    extensions: { code: 'FORBIDDEN' },
  });
}

export function requireAdmin(request, expectedToken) {
  if (!expectedToken) {
    throw forbidden();
  }

  const authorization = request.headers.get('authorization') || '';
  const presentedToken = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : '';

  const expected = Buffer.from(expectedToken);
  const presented = Buffer.from(presentedToken);

  if (
    expected.length !== presented.length ||
    !timingSafeEqual(expected, presented)
  ) {
    throw forbidden();
  }
}
