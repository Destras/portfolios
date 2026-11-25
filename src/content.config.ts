import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
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
	/** Detail fact sheet (D-W5): technologies, not translated. */
	stack: z.array(z.string().min(1)).min(1).optional(),
};

const projects = defineCollection({
	loader: file('src/data/projects.json'),
	schema: z.object({
		name: localized,
		...workRow,
		/** Detail fact sheet, projects only (D-W13). */
		status: localized.optional(),
		stakeholders: localized.optional(),
	}),
});

const experiences = defineCollection({
	loader: file('src/data/experiences.json'),
	schema: z.object({ org: z.string().min(1), ...workRow }),
});

/**
 * Long-form bodies of the detail pages (ADR 0001): one Markdown file per locale at
 * src/content/{projects,experiences}/{es,en}/{slug}.md, where {slug} is the JSON row id.
 * Entry ids look like "es/harness". Bodies carry no frontmatter: the facts live in the JSON row.
 * Locale completeness is checked by getWorkDetails() in src/lib/work-details.ts, not here.
 */
const detailBody = z.object({}).strict();

const projectDetails = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '*/*.md' }),
	schema: detailBody,
});

const experienceDetails = defineCollection({
	loader: glob({ base: './src/content/experiences', pattern: '*/*.md' }),
	schema: detailBody,
});

export const collections = { projects, experiences, projectDetails, experienceDetails };
