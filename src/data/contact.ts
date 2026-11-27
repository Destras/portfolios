/** Contact facts shared by the footer and the home page. Not prose, so they stay out of the dictionary. */
export const contactEmail = 'juan.werkalec+contactame@gmail.com';

/** Both locales link the EN CV until an ES one exists. */
export const cvHref = '/cv-en.pdf';

/** External profiles: footer links and the JSON-LD `sameAs` of the home page. */
export const socialProfiles = [
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-ignacio-werkalec/' },
	{ label: 'GitHub', href: 'https://github.com/Destras' },
] as const;

/** JSON-LD `knowsAbout` of the home page. Same list as the home "Herramientas" / "Tools" fact. */
export const knowsAbout = ['TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL', 'Supabase'];
