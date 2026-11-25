import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Work rows of the projects page (design/pages/projects.md, D-P8).
 * Each entry carries both languages, so a missing translation fails the build,
 * the same guarantee the i18n dictionaries give.
 */
const localized = z.object({ es: z.string().min(1), en: z.string().min(1) });

/** ISO month for `<time datetime>`, e.g. "2024-06". */
const month = z.string().regex(/^\d{4}-\d{2}$/);

const workRow = {
	role: localized,
	/** Display months, e.g. "abr 2026" / "Apr 2026". */
	start: localized,
	/** Display end month, or "actualidad" / "Present". */
	end: localized,
	startIso: month,
	/** null when the work is ongoing: the end is text, not a date. */
	endIso: month.nullable(),
	summary: localized,
};

const projects = defineCollection({
	loader: file('src/data/projects.json'),
	schema: z.object({ name: localized, ...workRow }),
});

const experiences = defineCollection({
	loader: file('src/data/experiences.json'),
	schema: z.object({ org: z.string().min(1), ...workRow }),
});

export const collections = { projects, experiences };
