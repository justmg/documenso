import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import type { Context } from 'hono';

// eslint-disable-next-line @typescript-eslint/require-await
export const handleRedirects = async (c: Context): Promise<string | null> => {
  const { req } = c;
  const path = req.path;
  const host = req.header('host')?.split(':')[0] ?? '';
  const canonicalHost = new URL(NEXT_PUBLIC_WEBAPP_URL()).hostname;

  if (host === `www.${canonicalHost}`) {
    const url = new URL(req.url);
    url.hostname = canonicalHost;

    return url.toString();
  }

  // Direct rewrites
  if (
    path === '/documents' ||
    path === '/documents/folders' ||
    path === '/templates' ||
    path === '/templates/folders'
  ) {
    return '/';
  }

  return null;
};
