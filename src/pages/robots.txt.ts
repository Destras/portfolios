import type { APIRoute } from 'astro';

/** robots.txt built from `site`, so the Sitemap line can't point to the wrong domain (docs: @astrojs/sitemap, "Sitemap discovery"). */
export const GET: APIRoute = ({ site }) => {
	const sitemapURL = new URL('sitemap-index.xml', site);
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL.href}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
