import type { ColorToken, LayoutToken, TextSizeToken } from '../data/styleguide';
import type { PageKey } from '../components/pages/sectionPages';
import type { SectionKey } from './routes';

/** Home copy that replaces a collection entry's org and summary in "Trabajo destacado" (src/data/home.ts). */
export interface WorkOverride {
	org: string;
	summary: string;
}

export interface PageMeta {
	title: string;
	description: string;
}

/** Sections without a page in `sectionPages`: they render the noindex placeholder. */
export type PlaceholderKey = Exclude<SectionKey, PageKey>;

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

/** One fact-list row on the home page: label and value. */
export interface Fact {
	label: string;
	value: string;
}

/** A sentence with one inline link: `before` + link + `after`. */
export interface InlineLink {
	before: string;
	link: string;
	after: string;
}

/** A /now list item: an optional bold name, then the text. */
export interface NowItem {
	name?: string;
	text: string;
}

/** An external link (opens in a new tab). */
export interface ExternalLink {
	label: string;
	href: string;
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
		/** Header theme and mode selector. Theme names are proper nouns and live in src/scripts/appearance.ts. */
		appearance: {
			/** Prefix of the button's accessible name ("Apariencia: Salvia · Día"). */
			label: string;
			theme: string;
			mode: string;
			day: string;
			night: string;
		};
		nav: {
			now: string;
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
	/** Projects page (design/pages/projects.md). Its rows live in the `projects` and `experiences` collections. */
	projects: {
		meta: PageMeta;
		/** The page's h1. */
		title: string;
		projectsHeading: string;
		experienceHeading: string;
	};
	/** 404 page (design/pages/404.md). Only EN renders (D-404-7); ES keeps the type symmetric. */
	notFound: {
		meta: { title: string };
		/** The page's h1. */
		title: string;
		/** Precedes the missing path, which the page script appends as <code>. */
		pathPrefix: string;
		intro: string;
		/** Label of the home row. The other rows reuse site.nav. */
		home: string;
	};
	/** Project and experience detail pages (design/pages/work-detail.md). Bodies live in src/content/**. */
	workDetail: {
		/** Back link above the h1, to the projects page. */
		back: string;
		/** FactSheet labels (D-W13). */
		facts: {
			role: string;
			duration: string;
			stack: string;
			status: string;
			stakeholders: string;
		};
	};
	/** Home, the "Sobre mí" design (design/pages/home.md). */
	home: {
		meta: PageMeta;
		eyebrow: string;
		/** The page's h1. */
		title: string;
		lead: string;
		actions: {
			email: string;
			cv: string;
		};
		/** Availability line under the actions (audit 2026-11-27, item 4). */
		availability: string;
		/** Same order in both locales. The tuple length keeps ES and EN in step. */
		facts: readonly [Fact, Fact, Fact];
		work: {
			heading: string;
			/** Link next to the heading, to the projects page. */
			allLink: string;
			/** The clinical platform row: "Freelance" and a longer summary than src/data/projects.json. */
			clinical: WorkOverride;
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
	/** Now page (design/pages/now.md). */
	now: {
		meta: PageMeta;
		/** The page's h1. */
		title: string;
		/** Update line under the h1: `{label} {date} · {place}`. The date's ISO value lives in NowPage.astro. */
		updated: {
			label: string;
			date: string;
			place: string;
		};
		work: { heading: string; body: string };
		building: { heading: string; items: readonly [NowItem] };
		learning: { heading: string; items: readonly [NowItem] };
		offline: { heading: string; items: readonly [NowItem, NowItem, NowItem] };
		/** Links to Wikipedia in the page's language. */
		films: { heading: string; items: readonly [ExternalLink, ExternalLink, ExternalLink] };
		openTo: { heading: string; body: string };
		/** Closing line: the link goes to nownownow.com/about (external, new tab). */
		closing: InlineLink;
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
