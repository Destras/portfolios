/** Direct visits to the 404 itself: showing "I couldn't find /404.html" would be noise. */
const selfPaths = new Set(['/404.html', '/404/']);

/**
 * The missing path to show on the 404 (design/pages/404.md, D-404-4), or null to keep the line hidden.
 * Decoded so /es/a%C3%B1o/ reads /es/año/; a malformed escape falls back to the raw path.
 */
export function displayPath(pathname: string): string | null {
	if (selfPaths.has(pathname)) return null;
	try {
		return decodeURI(pathname);
	} catch {
		return pathname;
	}
}
