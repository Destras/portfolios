import type { ColorToken, LayoutToken, TextSizeToken } from '../data/styleguide';
import type { SectionKey } from './routes';

/** Prose of one home "Trabajo destacado" row. Org and ISO dates live in src/data/home.ts. */
export interface WorkItem {
	role: string;
	/** Display start month, e.g. "abr 2026". */
	start: string;
	/** Display end month, or "actualidad" / "Present". */
	end: string;
	summary: string;
}

export interface PageMeta {
	title: string;
	description: string;
}

/** Sections that only have a placeholder page until their copy is written. */
export type PlaceholderKey = Exclude<SectionKey, 'styleguide' | 'colophon' | 'uses'>;

/** One colophon row: layer, technology and why (design doc §8.12 DataTable columns). */
export interface ColophonRow {
	layer: string;
	tech: string;
	why: string;
}

/** One Uses row: category, item and note (design doc §8.12 DataTable columns). */
export interface UsesRow {
	cat: string;
	item: string;
	note: string;
}

/** A sentence with one inline link: `before` + link + `after`. */
export interface InlineLink {
	before: string;
	link: string;
	after: string;
}

/** Every piece of prose on the site. Facts (names, values, tokens) stay out of it. */
export interface Dictionary {
	/** Chrome shared by every page: skip link, header and footer. */
	site: {
		skipLink: string;
		/** aria-label of the main nav. */
		navLabel: string;
		/** aria-label of the language switch. */
		langLabel: string;
		nav: {
			process: string;
			projects: string;
		};
		footer: {
			cv: string;
			now: string;
			uses: string;
			colophon: string;
			styleguide: string;
			/** Visually hidden, appended to links that open in a new tab. Starts with a space. */
			newTab: string;
			/** Written by hand: it means the content changed, not that the site was deployed. */
			updated: string;
			signoff: string;
		};
	};
	/** Placeholder pages: the title is also the h1. */
	pages: Record<PlaceholderKey, PageMeta>;
	home: {
		meta: PageMeta;
		hero: {
			/** The page's h1. */
			title: string;
		};
		work: {
			heading: string;
			/** Link next to the heading, to the projects page. */
			allLink: string;
			/** Same order and length as `workEntries` in src/data/home.ts. */
			items: readonly [WorkItem, WorkItem, WorkItem];
		};
	};
	uses: {
		/** The description is the lead (design doc §9.3). */
		meta: PageMeta;
		/** The page's h1. */
		title: string;
		/** The AI line, shown as the PageTitle lead. */
		lead: string;
		table: {
			/** Visually hidden caption. */
			caption: string;
			cat: string;
			item: string;
			note: string;
		};
		/** Same order in both locales. The tuple length keeps ES and EN in step. */
		rows: readonly [UsesRow, UsesRow, UsesRow, UsesRow, UsesRow, UsesRow];
	};
	colophon: {
		meta: PageMeta;
		/** The page's h1. */
		title: string;
		lead: string;
		table: {
			/** Visually hidden caption. */
			caption: string;
			layer: string;
			tech: string;
			why: string;
		};
		/** Same order in both locales. The tuple length keeps ES and EN in step. */
		rows: readonly [ColophonRow, ColophonRow, ColophonRow, ColophonRow, ColophonRow, ColophonRow, ColophonRow, ColophonRow];
		/** Closing line: link to the styleguide. */
		styleguide: InlineLink;
		/** Closing line: link to the source on GitHub (external, new tab). */
		source: InlineLink;
	};
	styleguide: {
		meta: PageMeta;
		intro: string;
		color: {
			heading: string;
			lead: string;
			contrastHeading: string;
			/** Column headers of the contrast tables. */
			pair: string;
			minimum: string;
			light: string;
			dark: string;
		};
		colorUse: Record<ColorToken, string>;
		typography: {
			heading: string;
			lead: string;
			weightSample: string;
			arrowSample: string;
			scaleHeading: string;
			scaleSample: string;
			leadingHeading: string;
		};
		textSizeUse: Record<TextSizeToken, string>;
		spacing: {
			heading: string;
			lead: string;
		};
		elements: {
			heading: string;
			lead: string;
			sectionTitle: string;
			caseTitle: string;
			problemLabel: string;
			/** Text before the inline link. */
			problemBody: string;
			linkText: string;
			/** Text after the inline link. */
			linkAfter: string;
			listItems: readonly [string, string];
			tableCaption: string;
			tableCategory: string;
			tableItem: string;
		};
		shape: {
			heading: string;
			focusLabel: string;
			/** Followed by the focus token names in parentheses. */
			focusCaption: string;
		};
		layoutUse: Record<LayoutToken, string>;
	};
}
