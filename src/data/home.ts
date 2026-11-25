/**
 * Which entries the home "Trabajo destacado" shows, in order (copy-mvp §4.4).
 * Facts and prose come from the collections (src/data/*.json) through WorkList.
 * The clinical row keeps its home copy ("Freelance" + a longer summary) from the dictionary.
 */
import type { Dictionary } from '../i18n/types';
import type { WorkRef } from '../components/WorkList.astro';

export function featuredRefs(t: Dictionary): WorkRef[] {
	return [
		{ kind: 'projects', id: 'plataforma-clinica', ...t.home.work.clinical },
		{ kind: 'experiences', id: 'harness' },
		{ kind: 'experiences', id: 'split-io' },
	];
}
