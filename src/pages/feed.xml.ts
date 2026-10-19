import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { posts } from '../lib/posts';
import { site } from '../site';

export function GET(context: APIContext) {
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      link: post.url,
      categories: post.tags,
      content: post.html,
    })),
  });
}
