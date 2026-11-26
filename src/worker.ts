/**
 * Cloudflare Worker that answers only `/` (wrangler.jsonc: `assets.run_worker_first: ["/"]`). Every other URL is
 * served straight from the static assets in dist/ and never reaches this code.
 *
 * `/` redirects to /es/ or /en/ by Accept-Language (design/diseno-juaniw.md:66). It's a 307 with
 * `Cache-Control: no-store` and `Vary: Accept-Language`, so no browser or cache keeps one visitor's language for
 * another. The query string is kept, so campaign params on shared links survive the redirect.
 */
import { preferredLocale } from './i18n/acceptLanguage.ts';

export function redirectToPreferredLocale(request: Request): Response {
	const url = new URL(request.url);
	const locale = preferredLocale(request.headers.get('Accept-Language'));
	const location = new URL(`/${locale}/${url.search}`, url);

	// Not Response.redirect(): its headers are immutable, and we need Vary and Cache-Control.
	return new Response(null, {
		status: 307,
		headers: {
			Location: location.href,
			Vary: 'Accept-Language',
			'Cache-Control': 'no-store',
		},
	});
}

export default { fetch: redirectToPreferredLocale };
