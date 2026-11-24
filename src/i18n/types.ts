export interface PageMeta {
	title: string;
	description: string;
}

/** Every piece of prose on the site. Facts (names, values, tokens) stay out of it. */
export interface Dictionary {
	home: {
		meta: PageMeta;
	};
}
