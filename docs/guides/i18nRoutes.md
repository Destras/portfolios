# Guía: rutas traducidas en Astro con un solo archivo dinámico

Objetivo: servir la misma página con URLs distintas según el idioma, **sin duplicar archivos**.

| Sección | Español | Inglés |
|---|---|---|
| Inicio | `/es/` | `/en/` |
| Proyectos | `/es/proyectos/` | `/en/projects/` |
| Trabajo | `/es/trabajo/` | `/en/work/` |

Idea central: **un único mapa de rutas** (`src/i18n/routes.ts`) del que salen las páginas generadas, los links del menú, el selector de idioma, el `canonical` y los `hreflang`. Renombrar una ruta o agregar un idioma se hace en un solo lugar.

> ✅ Todo el código de esta guía fue compilado con **Astro 7.4.13**: `astro check` sin errores ni warnings y `astro build` sin warnings.
> Se apoya en el [routing i18n oficial](https://docs.astro.build/en/guides/internationalization/) y en la sección *Translate Routes* de la [receta de i18n](https://docs.astro.build/en/recipes/i18n/).

---

## 1. Estructura final

```
src/
├── i18n/
│   ├── config.ts          ← idiomas soportados (fuente de verdad en TS)
│   ├── routes.ts          ← mapa de rutas + helpers de URL
│   └── ui.ts              ← diccionario de textos + t()
├── layouts/
│   └── Layout.astro       ← <html lang>, canonical, hreflang, nav, selector
├── components/pages/
│   ├── ProjectsPage.astro ← contenido de la sección (sin lógica de rutas)
│   └── WorkPage.astro
└── pages/
    ├── index.astro        ← redirige / → /es/
    └── [locale]/
        ├── index.astro    ← /es/, /en/
        └── [section].astro← /es/proyectos/, /en/projects/, /es/trabajo/, /en/work/
```

Son solo **3 archivos de página** sin importar cuántos idiomas o secciones tengas.

---

## 2. Configuración de Astro

```js
// astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.com",   // necesario para URLs absolutas (canonical / hreflang)
  trailingSlash: "always",       // URLs consistentes: /es/proyectos/
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true, // todos los idiomas con prefijo → encaja con [locale]
    },
  },
});
```

**Por qué `prefixDefaultLocale: true`:** la carpeta `[locale]` genera `/es/...` y `/en/...`. Con `false` (el default), Astro espera el idioma por defecto en la raíz (`/proyectos/`), lo que no coincide con esta estructura.

> ⚠️ **No uses `redirectToDefaultLocale: true` acá.** Lo probé:
> - Con `redirectToDefaultLocale` y sin `src/pages/index.astro`, `astro check` (y el dev server) fallan con `MissingIndexForInternationalization`.
> - Con `redirectToDefaultLocale` y con `index.astro`, el build avisa *"conflicts with higher priority route `/`"*.
>
> La combinación limpia es la de esta guía: **sin** `redirectToDefaultLocale`, y un `index.astro` que redirige por su cuenta (paso 6).

---

## 3. Idiomas soportados

```ts
// src/i18n/config.ts
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
```

Mantené esta lista igual a `i18n.locales` del `astro.config.mjs`. Acá la tenés tipada para TypeScript.

---

## 4. El mapa de rutas (la pieza clave)

```ts
// src/i18n/routes.ts
import { getRelativeLocaleUrl, getAbsoluteLocaleUrl } from "astro:i18n";
import { locales, type Locale } from "./config";

export const routes = {
  projects: { es: "proyectos", en: "projects" },
  work:     { es: "trabajo",   en: "work" },
} as const satisfies Record<string, Record<Locale, string>>;

export type SectionKey = keyof typeof routes;      // "projects" | "work"
export type RouteKey = "home" | SectionKey;        // incluye la home

function slugFor(key: RouteKey, locale: Locale): string {
  return key === "home" ? "" : routes[key][locale];
}

/** Ruta relativa: localizedPath("projects", "es") → "/es/proyectos/" */
export function localizedPath(key: RouteKey, locale: Locale): string {
  return getRelativeLocaleUrl(locale, slugFor(key, locale));
}

/** URL absoluta (usa `site`): → "https://example.com/es/proyectos/" */
export function localizedUrl(key: RouteKey, locale: Locale): string {
  return getAbsoluteLocaleUrl(locale, slugFor(key, locale));
}

/** Todas las versiones de una página, para hreflang */
export function alternates(key: RouteKey) {
  return locales.map((locale) => ({ locale, href: localizedUrl(key, locale) }));
}
```

Puntos importantes:

- **Las claves (`projects`, `work`) son identificadores internos**, no URLs. El código siempre habla en claves; los slugs solo aparecen en este archivo.
- **`satisfies Record<string, Record<Locale, string>>`** hace que TypeScript marque un error si a una sección le falta la traducción de algún idioma. Verificado: quitar `en` de `work` produce errores en `astro check`.
- Se usan `getRelativeLocaleUrl` / `getAbsoluteLocaleUrl` de `astro:i18n` en vez de armar strings a mano, así respetan `base`, `trailingSlash` y `site`.

---

## 5. Textos de la UI

```ts
// src/i18n/ui.ts
import type { Locale } from "./config";

const es = {
  "nav.home": "Inicio",
  "nav.projects": "Proyectos",
  "nav.work": "Trabajo",
  "home.title": "Hola",
  "projects.title": "Mis proyectos",
  "work.title": "Experiencia laboral",
} as const;

type UIKey = keyof typeof es;

export const ui: Record<Locale, Partial<Record<UIKey, string>>> = {
  es,
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.work": "Work",
    "home.title": "Hi",
    "projects.title": "My projects",
    "work.title": "Work experience",
  },
};

/** Si falta una traducción, devuelve el texto en español */
export function useTranslations(locale: Locale) {
  return (key: UIKey): string => ui[locale][key] ?? es[key];
}
```

El español es el diccionario de referencia: define las claves válidas y es el respaldo. Como todas las páginas existen en todos los idiomas, **el `fallback` nativo de Astro no se activa nunca**; el respaldo de textos vive acá.

> Convención usada: la clave del título de cada sección es `<SectionKey>.title`. Eso permite que `[section].astro` calcule el título como `` t(`${key}.title`) `` con tipado correcto.

---

## 6. Redirección de la raíz `/`

```astro
---
// src/pages/index.astro
import { defaultLocale } from "../i18n/config";
return Astro.redirect(`/${defaultLocale}/`);
---
```

En un build estático genera un `dist/index.html` con meta refresh hacia `/es/` (más `noindex` y `canonical`). Si tu hosting soporta redirecciones del lado del servidor (Netlify `_redirects`, `vercel.json`, etc.), podés configurar ahí un 301 de `/` a `/es/`.

---

## 7. Home por idioma

```astro
---
// src/pages/[locale]/index.astro
import type { GetStaticPaths } from "astro";
import Layout from "../../layouts/Layout.astro";
import { locales, type Locale } from "../../i18n/config";
import { useTranslations } from "../../i18n/ui";

export const getStaticPaths = (() =>
  locales.map((locale) => ({ params: { locale } }))) satisfies GetStaticPaths;

const locale = Astro.params.locale as Locale;
const t = useTranslations(locale);
---
<Layout locale={locale} routeKey="home" title={t("home.title")}>
  <h1>{t("home.title")}</h1>
</Layout>
```

---

## 8. Las secciones: un archivo para todas

```astro
---
// src/pages/[locale]/[section].astro
import type { GetStaticPaths } from "astro";
import Layout from "../../layouts/Layout.astro";
import ProjectsPage from "../../components/pages/ProjectsPage.astro";
import WorkPage from "../../components/pages/WorkPage.astro";
import { locales, type Locale } from "../../i18n/config";
import { routes, type SectionKey } from "../../i18n/routes";
import { useTranslations } from "../../i18n/ui";

// Genera una ruta por cada (sección × idioma) a partir del mapa
export const getStaticPaths = (() =>
  (Object.keys(routes) as SectionKey[]).flatMap((key) =>
    locales.map((locale) => ({
      params: { locale, section: routes[key][locale] },
      props: { key },
    })),
  )) satisfies GetStaticPaths;

// Qué componente renderiza cada sección
const pages = {
  projects: ProjectsPage,
  work: WorkPage,
} satisfies Record<SectionKey, unknown>;

const locale = Astro.params.locale as Locale;
const { key } = Astro.props;
const Page = pages[key];
const t = useTranslations(locale);
---
<Layout locale={locale} routeKey={key} title={t(`${key}.title`)}>
  <Page locale={locale} />
</Layout>
```

Cómo funciona:

1. `getStaticPaths` recorre el mapa y produce 4 rutas: `es/proyectos`, `en/projects`, `es/trabajo`, `en/work`.
2. Cada ruta recibe por `props` su **clave interna** (`projects` o `work`), no el slug. Así la página no necesita "adivinar" qué sección es a partir del texto de la URL.
3. `pages[key]` elige el componente. El `satisfies Record<SectionKey, unknown>` hace que TypeScript falle si agregás una sección al mapa y te olvidás de registrar su componente. Verificado con `astro check`.

Usar `satisfies GetStaticPaths` hace que `Astro.props` quede tipado automáticamente (`key: "projects" | "work"`).

---

## 9. Componentes de contenido

Los componentes de página **no saben nada de rutas**. Reciben el idioma y muestran contenido:

```astro
---
// src/components/pages/ProjectsPage.astro
import type { Locale } from "../../i18n/config";
import { useTranslations } from "../../i18n/ui";

interface Props { locale: Locale }
const t = useTranslations(Astro.props.locale);
---
<h1>{t("projects.title")}</h1>
<!-- listado de proyectos… -->
```

`WorkPage.astro` sigue el mismo patrón con `t("work.title")`.

---

## 10. Layout: `lang`, SEO, menú y selector de idioma

```astro
---
// src/layouts/Layout.astro
import { locales, type Locale } from "../i18n/config";
import { alternates, localizedPath, localizedUrl, type RouteKey } from "../i18n/routes";
import { useTranslations } from "../i18n/ui";

interface Props {
  locale: Locale;
  routeKey: RouteKey;   // qué página es, en términos internos
  title: string;
}
const { locale, routeKey, title } = Astro.props;
const t = useTranslations(locale);
const labels: Record<Locale, string> = { es: "Español", en: "English" };
---
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>{title}</title>

    <!-- SEO: URL canónica y versiones en otros idiomas -->
    <link rel="canonical" href={localizedUrl(routeKey, locale)} />
    {alternates(routeKey).map(({ locale: l, href }) => (
      <link rel="alternate" hreflang={l} href={href} />
    ))}
    <link rel="alternate" hreflang="x-default" href={localizedUrl(routeKey, "es")} />
  </head>
  <body>
    <nav>
      <a href={localizedPath("home", locale)}>{t("nav.home")}</a>
      <a href={localizedPath("projects", locale)}>{t("nav.projects")}</a>
      <a href={localizedPath("work", locale)}>{t("nav.work")}</a>
    </nav>

    <slot />

    <!-- Selector: lleva a la MISMA página en el otro idioma -->
    <ul>
      {locales.map((l) => (
        <li>
          <a
            href={localizedPath(routeKey, l)}
            hreflang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
          >
            {labels[l]}
          </a>
        </li>
      ))}
    </ul>
  </body>
</html>
```

Esto resuelve el problema principal de traducir rutas: **el selector de idioma no puede simplemente cambiar el prefijo** (`/es/proyectos/` → `/en/proyectos/` daría 404). Como cada página le pasa su `routeKey` al layout, el selector arma la URL correcta: `/en/projects/`.

HTML generado para `/es/proyectos/` (salida real del build):

```html
<html lang="es">
<head>
  <title>Mis proyectos</title>
  <link rel="canonical" href="https://example.com/es/proyectos/">
  <link rel="alternate" hreflang="es" href="https://example.com/es/proyectos/">
  <link rel="alternate" hreflang="en" href="https://example.com/en/projects/">
  <link rel="alternate" hreflang="x-default" href="https://example.com/es/proyectos/">
</head>
<body>
  <nav><a href="/es/">Inicio</a><a href="/es/proyectos/">Proyectos</a><a href="/es/trabajo/">Trabajo</a></nav>
  <h1>Mis proyectos</h1>
  <ul>
    <li><a href="/es/proyectos/" hreflang="es" lang="es" aria-current="true">Español</a></li>
    <li><a href="/en/projects/" hreflang="en" lang="en">English</a></li>
  </ul>
</body>
</html>
```

---

## 11. Recetas de mantenimiento

### Agregar una sección (ej. "Contacto")

1. `routes.ts`: `contact: { es: "contacto", en: "contact" }`
2. `ui.ts`: agregar `"nav.contact"` y `"contact.title"` en ambos idiomas.
3. Crear `components/pages/ContactPage.astro`.
4. `[section].astro`: registrar `contact: ContactPage` en `pages`.
5. Agregar el link en el `<nav>` del layout.

Si te olvidás del paso 1 (algún idioma) o del 4, `astro check` falla.

### Agregar un idioma (ej. portugués)

1. `astro.config.mjs`: `locales: ["es", "en", "pt"]`.
2. `config.ts`: `locales = ["es", "en", "pt"] as const`.
3. `routes.ts`: agregar `pt` en cada sección. TypeScript te marca las que falten.
4. `ui.ts`: agregar el diccionario `pt` (puede ser parcial; lo que falte cae al español).
5. `Layout.astro`: agregar la etiqueta en `labels`.

No se crea **ningún archivo de página** nuevo.

### Renombrar un slug

Si cambiás `proyectos` → `portfolio`, la URL vieja deja de existir. Agregá una redirección para no perder links ni posicionamiento:

```js
// astro.config.mjs
export default defineConfig({
  redirects: {
    "/es/proyectos/": "/es/portfolio/",
  },
  // ...
});
```

---

## 12. Cuidados y límites

- **Colisiones con rutas fijas.** Si dentro de `src/pages/[locale]/` creás un archivo estático (ej. `styleguide.astro`), Astro le da prioridad sobre `[section].astro`. Asegurate de que ningún slug del mapa se llame igual que un archivo fijo.
- **Slugs únicos por idioma.** Dos secciones no pueden tener el mismo slug en el mismo idioma, o generarían la misma URL.
- **Fallback nativo desactivado de hecho.** Todas las rutas existen en todos los idiomas, así que `i18n.fallback` no aplica. Lo que falte traducir se cubre con `useTranslations`.
- **Solo build estático.** `getStaticPaths` es para páginas prerenderizadas (el modo por defecto). Si alguna página se renderiza on demand, tenés que leer `locale` y `section` de `Astro.params`, buscar la clave en el mapa a mano y devolver 404 si no existe (podés usar `isLocale` de `config.ts`).
- **Una lista de idiomas en dos lugares.** `astro.config.mjs` y `config.ts` deben coincidir. Se puede generar una desde la otra, pero mantenerlas a mano es simple con pocos idiomas.

---

## 13. Checklist

- [ ] `prefixDefaultLocale: true` y **sin** `redirectToDefaultLocale`.
- [ ] `src/pages/index.astro` redirige a `/<defaultLocale>/`.
- [ ] `site` configurado (para `canonical` y `hreflang`).
- [ ] Todo link interno usa `localizedPath(key, locale)`, nunca strings a mano.
- [ ] Cada página pasa su `routeKey` al layout.
- [ ] `astro check` sin errores después de cada cambio en el mapa.
- [ ] Redirecciones configuradas si renombrás un slug.
