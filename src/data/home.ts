/**
 * Language-neutral facts of the home "Trabajo destacado" rows (copy-mvp §4.4).
 * Prose (role, display dates, summary) lives in the dictionary under `home.work.items`, same order.
 * ISO months feed `<time datetime>`; `endIso: null` means the job is ongoing.
 */
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
