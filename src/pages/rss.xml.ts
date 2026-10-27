import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const news = await getCollection('news');
  return rss({
    title: 'Togh Aman Committee — Official Announcements',
    description: 'Verified public press releases, event notices, and executive statements from the Togh Aman Committee.',
    site: context.site || 'https://www.toghamancomitee.com',
    items: news.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/news/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
};
