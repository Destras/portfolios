import type { ColorToken, LayoutToken, TextSizeToken } from '../data/styleguide';

export interface PageMeta {
	title: string;
	description: string;
}

/** Every piece of prose on the site. Facts (names, values, tokens) stay out of it. */
export interface Dictionary {
	home: {
		meta: PageMeta;
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
