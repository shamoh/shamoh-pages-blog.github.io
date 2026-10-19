import YAML from 'yaml';

// Posts are HTML files exported from Blogger, with a YAML front matter: src/posts/<yyyy-mm-dd>-<slug>.html.
const files = import.meta.glob<string>('../posts/*.html', { eager: true, query: '?raw', import: 'default' });

export interface Post {
  slug: string;
  title: string;
  date: Date;
  tags: string[];
  html: string;
  /** /yyyy/mm/dd/<slug>.html, the address of the old Jekyll site (date in UTC, like Jekyll without a time zone) */
  url: string;
}

function parse(path: string, source: string): Post {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`${path}: chybí front matter`);
  const data = YAML.parse(match[1]);
  const slug = path.replace(/^.*\/\d{4}-\d{2}-\d{2}-/, '').replace(/\.html$/, '');
  const date = new Date(data.date);
  if (Number.isNaN(date.getTime())) throw new Error(`${path}: neplatné datum ${data.date}`);
  const [y, m, d] = date.toISOString().slice(0, 10).split('-');
  return { slug, title: data.title, date, tags: data.tags ?? [], html: match[2], url: `/${y}/${m}/${d}/${slug}.html` };
}

/** All posts, the newest first. */
export const posts: Post[] = Object.entries(files)
  .map(([path, source]) => parse(path, source))
  .sort((a, b) => b.date.getTime() - a.date.getTime());

/** "January 16, 2015" */
export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'UTC' });

/** Tags in alphabetical order, each with its posts (the newest first). */
export function postsByTag(): [string, Post[]][] {
  const tags = new Map<string, Post[]>();
  for (const post of posts) for (const tag of post.tags) tags.set(tag, [...(tags.get(tag) ?? []), post]);
  return [...tags].sort(([a], [b]) => a.localeCompare(b));
}
