/**
 * Language-neutral facts of the home "Trabajo destacado" rows (copy-mvp §4.4).
 * Prose (role, display dates, summary) lives in the dictionary under `home.work.items`, same order.
 * ISO months feed `<time datetime>`; `endIso: null` means the job is ongoing.
 */
import type { Dictionary } from '../i18n/types';
import type { ExperienceItem } from '../components/ExperienceList.astro';

export interface WorkEntry {
	id: string;
	org: string;
	startIso: string;
	endIso: string | null;
}

export const workEntries = [
	{ id: 'freelance', org: 'Freelance', startIso: '2026-04', endIso: null },
	{ id: 'harness', org: 'Harness', startIso: '2024-06', endIso: '2026-10' },
	{ id: 'split-io', org: 'Split.io', startIso: '2022-01', endIso: '2024-06' },
] as const satisfies readonly [WorkEntry, WorkEntry, WorkEntry];

/** Featured work rows for one locale: facts merged with their prose. Used by the home page. */
export function featuredWork(t: Dictionary): ExperienceItem[] {
	// Facts and prose share the same order (both are 3-tuples, so the types keep them in step).
	return workEntries.map((entry, i) => ({ ...entry, ...t.home.work.items[i] }));
}
