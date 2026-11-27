/**
 * Pre-paint script: applies the stored theme and mode before first paint. Read-only: never writes to localStorage.
 * Same rules as AppearanceMenu.astro: valid stored values win, the rest is default/system.
 * Rendered with `set:html` in Layout.astro and 404.astro. Astro doesn't hash unprocessed (is:inline) scripts for the CSP,
 * so astro.config.mjs hashes this exact string (security.csp.scriptDirective.hashes): edit it here only.
 */
export const themeBootstrap =
	"try{const r=document.documentElement,t=localStorage.getItem('theme'),m=localStorage.getItem('mode');" +
	"if(['salvia','brasa'].includes(t))r.dataset.theme=t;if(['light','dark'].includes(m))r.dataset.mode=m}catch{}";
