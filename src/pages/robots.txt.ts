import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /portal/
Disallow: /api/

Sitemap: https://www.toghamancomitee.com/sitemap-index.xml
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
