import type { Locale } from './locales';

/**
 * The locale `/` redirects to (design/diseno-juaniw.md §2): `es` when the visitor's preferred language is Spanish
 * (`es`, `es-AR`, `es-419`…), `en` in every other case, including a missing or unparseable header.
 *
 * "Preferred" is the entry with the highest q-value. The sort is stable, so entries with the same weight keep
 * the order the browser sent them in: `en, es` means English first. Entries with q=0 (explicitly rejected) or an
 * invalid q are dropped. Never throws.
 */
export function preferredLocale(header: string | null): Locale {
	if (!header) return 'en';

	const entries: { tag: string; q: number }[] = [];
	for (const part of header.split(',')) {
		const [rawTag, ...params] = part.split(';');
		const tag = rawTag.trim();
		if (!tag) continue;

		let q = 1;
		for (const param of params) {
			const [key, value] = param.split('=').map((s) => s.trim());
			if (key.toLowerCase() !== 'q') continue;
			q = value && /^\d+(\.\d+)?$/.test(value) ? Number(value) : NaN;
		}
		if (!(q > 0 && q <= 1)) continue;

		entries.push({ tag, q });
	}

	const [first] = entries.sort((a, b) => b.q - a.q);
	if (!first) return 'en';
	return first.tag.split('-')[0].toLowerCase() === 'es' ? 'es' : 'en';
}
