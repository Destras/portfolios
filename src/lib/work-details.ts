import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, isLocale, type Locale } from '../i18n/locales';
import type { WorkKind } from '../i18n/routes';

/** Markdown body collection of each JSON row collection (src/content.config.ts). */
export const detailCollections = {
	projects: 'projectDetails',
	experiences: 'experienceDetails',
} as const satisfies Record<WorkKind, string>;

type DetailCollection<K extends WorkKind> = (typeof detailCollections)[K];

/**
 * Joins JSON row ids with Markdown body ids ("es/harness") and returns slug → body id per locale.
 * It is the Markdown equivalent of the `localized` schema (D-W2): it collects every problem
 * (a body in one locale only, a body without a row, a file outside a locale folder) and throws
 * one error listing them all, so the build fails instead of shipping a half-translated page.
 */
export function pairDetails(
	kind: WorkKind,
	rowIds: readonly string[],
	detailIds: readonly string[],
): Map<string, Record<Locale, string>> {
	const problems: string[] = [];
	const found = new Map<string, Partial<Record<Locale, string>>>();
	const rows = new Set(rowIds);

	for (const id of detailIds) {
		const [locale, ...rest] = id.split('/');
		const slug = rest.join('/');
		if (!isLocale(locale) || rest.length !== 1) {
			problems.push(`${kind}: "${id}" is not under a locale folder (${locales.join(', ')})`);
			continue;
		}
		if (!rows.has(slug)) {
			problems.push(`${kind}: "${id}" has no row in src/data/${kind}.json`);
			continue;
		}
		found.set(slug, { ...found.get(slug), [locale]: id });
	}

	const pairs = new Map<string, Record<Locale, string>>();
	for (const [slug, byLocale] of found) {
		const have = locales.filter((l) => byLocale[l]);
		const missing = locales.filter((l) => !byLocale[l]);
		for (const m of missing) {
			problems.push(
				`${kind}: "${slug}" has ${have.join(', ')} but is missing ${m} (src/content/${kind}/${m}/${slug}.md)`,
			);
		}
		if (missing.length === 0) pairs.set(slug, byLocale as Record<Locale, string>);
	}

	if (problems.length > 0) throw new Error(`Work detail check failed:\n${problems.join('\n')}`);
	return pairs;
}

export interface WorkDetail<K extends WorkKind> {
	kind: K;
	slug: string;
	row: CollectionEntry<K>;
	entries: Record<Locale, CollectionEntry<DetailCollection<K>>>;
}

/**
 * Every row of `kind` that has a body, with the body in each locale. The only way to read the
 * body collections: going through it is what makes a broken pair fail the build (ADR 0001).
 */
export async function getWorkDetails<K extends WorkKind>(kind: K): Promise<WorkDetail<K>[]> {
	const rows = (await getCollection(kind)) as CollectionEntry<K>[];
	const bodies = (await getCollection(detailCollections[kind])) as CollectionEntry<DetailCollection<K>>[];
	const pairs = pairDetails(
		kind,
		rows.map((r) => r.id),
		bodies.map((b) => b.id),
	);
	const bodyById = new Map(bodies.map((b) => [b.id, b]));

	return rows.flatMap((row) => {
		const ids = pairs.get(row.id);
		if (!ids) return [];
		const entries = Object.fromEntries(locales.map((l) => [l, bodyById.get(ids[l])!])) as Record<
			Locale,
			CollectionEntry<DetailCollection<K>>
		>;
		return [{ kind, slug: row.id, row, entries }];
	});
}
