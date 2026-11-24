# diseno-juaniw.md

> Documentación de diseño de **juaniw.com**: la única fuente de verdad para programar el MVP.
> **v2 — 2026-11-24.** Combina la v1 de Claude Design ("Final webpage") con `copy-mvp.md` (v2026-11-20) y las decisiones de las fases 1 a 6.
> **Cómo leerlo:** las secciones 0 a 14 siguen el formato del handoff. El **Anexo A** es el plan para programar y el **Anexo B** es el checklist de arranque.

---

## ✅ Decisiones confirmadas (2026-11-24)

Juan confirmó las 6 recomendaciones. El documento las tiene aplicadas.

| # | Decisión | Confirmado | Alternativa descartada | Afecta |
|---|---|---|---|---|
| **P1** | Paleta | **Salvia.** Más contraste (acento 7,3:1 contra 5,1:1), se siente calma y confiable (Cuidador + Gobernante) y el verde no se asocia a botones de venta | Brasa: más cálida y enérgica, pero el naranja es el color clásico de un CTA de venta, y su foco en modo claro queda justo (3,4:1) | §3, `data-theme` en el layout |
| **P2** | Alcance del MVP | **Inicio, Ahora, Uses y 404, en ES y EN.** Son las páginas que tienen copy. Proyectos, Casos, Proceso y Colofón quedan diseñadas para la fase 2 | Publicar también las páginas nuevas, pero antes hay que escribir su copy | §2, §8, §9 |
| **P3** | Inicio V1 o V2 | **Ninguna de las dos tal cual:** los 3 mini-casos con su ficha técnica (lo que define `copy-mvp` §4.3) y la experiencia en filas (V2) | V1: bloques por empresa, sin ficha. V2: filas, sin mini-casos | §8.8, §8.9, §9.1 |
| **P4** | Modo | **Sigue al sistema** (`prefers-color-scheme`), sin botón. `data-mode` queda solo para probar | Lo que dice la v1: el modo se fuerza con `data-mode` y nunca sigue al sistema. Pero sin un botón, el modo oscuro no aparece nunca | §5.4, §6 |
| **P5** | LinkedIn | **Se mantiene.** Es el CTA secundario de `copy-mvp` §4.5 | La v1 dice "No usás LinkedIn". Si es así, hay que reescribir el cierre | §8.4, §9.1, copy |
| **P6** | Nombres de empresas | **Como en `copy-mvp` §4.4:** Harness, Split.io y MangooDev SRL. JPMorgan Chase solo aparece en el resumen de Split.io (decisión del 2026-11-24) | La v1 dice "solo Harness". Si es así, Split.io y MangooDev pasan a descripciones genéricas | §8.8, §8.9, copy |

> **P5 y P6:** manda `copy-mvp.md`. Las notas de la v1 ("No usás LinkedIn", "solo Harness") quedan descartadas.

---

## 0. Metadatos

| Campo | Valor |
|---|---|
| Proyecto | juaniw.com |
| Versión | v2 — 2026-11-24 |
| Theme | `salvia` (confirmado). `brasa` queda en el CSS como alternativa; se puede borrar |
| Fuentes de verdad | `copy-mvp.md` (v2026-11-20) para el texto · canvas "portfolio color v2", página "Final webpage" (versión 1795529325-9dee) para el aspecto · `conclusiones-fase-1-y-2.md` para los criterios |
| Probado en | Todavía no se probó en navegadores. Los contrastes están calculados desde los valores OKLCH (verificados dos veces, de forma independiente) |
| Cambios desde la v1 | Se integró el copy; se definió el alcance del MVP; el inicio lleva `h1`, rol visible y mini-casos con ficha; tipografía de lectura de 16 a 17 px; modo según el sistema; foco de Brasa corregido; rutas con prefijo de idioma; áreas táctiles; link para saltar al contenido; 404; plan de implementación |

---

## 1. Mensaje y criterios

**Mensaje:** Senior Full-Stack Engineer con foco en UI. Me dan lo ambiguo y lo llevo a producción, rápido y sin que la calidad pague la velocidad. La web no lo dice: lo muestra.
**Tiene que sentirse:** confiable · precisa · cálida.
**Adjetivos:** Autónomo (no lobo solitario) · Resolutivo (no desprolijo) · Honesto (no frío).
**No puede parecer:** humo · venta · template.
**Prohibido:** fotos (tuyas o de proyectos) · capturas de Harness o con datos de pacientes · barras de % de skills · muros de logos · testimonios · "apasionado" y frases genéricas · "contratame" o "disponible" · animaciones que retrasan la lectura · cursor custom, partículas o 3D · tercera persona.
**Regla:** la web muestra trabajo, no pide trabajo.

---

## 2. Mapa del sitio y rutas

| Página | Ruta ES | Ruta EN | h1 | Copy | En el MVP |
|---|---|---|---|---|---|
| Inicio | `/es` | `/en` | La frase del hero | copy-mvp §4.2–4.5 | **Sí** |
| Ahora | `/es/now` | `/en/now` | Ahora / Now | copy-mvp §4.7 | **Sí** |
| Uses | `/es/uses` | `/en/uses` | Uses | copy-mvp §4.8 | **Sí** |
| 404 | cualquier ruta inexistente | | Esta página no existe. / This page doesn't exist. | copy-mvp §4.9 | **Sí** |
| CV | `/cv-en.pdf` | `/cv-en.pdf` | — | — | **Sí** (por ahora solo en inglés) |
| Proyectos | `/es/proyectos` | `/en/projects` | Proyectos / Projects | `src/data/*.json` + diccionario (ver §9.5) | **Sí** (desde el 2026-11-24) |
| Detalle de proyecto | `/es/proyectos/{slug}` | `/en/projects/{slug}` | Nombre del proyecto | Falta | No (fase 2) |
| Casos de estudio | `/es/casos` | `/en/case-studies` | Casos de estudio / Case studies | Falta | No (fase 2) |
| Caso | `/es/casos/{slug}` | `/en/case-studies/{slug}` | Nombre del caso | Falta | No (fase 2) |
| Proceso | `/es/proceso` | `/en/process` | Proceso / Process | Falta | No (fase 2) |
| Colofón | `/es/colofon` | `/en/colophon` | Colofón / Colophon | Falta | No (fase 2) |

- **Redirección de `/`:** a `/es` o `/en` según `Accept-Language`. Si el primer idioma es español (`es`, `es-AR`, etc.), va a `/es`; en cualquier otro caso, a `/en`. Es una redirección 307, para que no quede cacheada. Ver Anexo A.3.
- **Selector de idioma:** en el MVP las rutas son iguales en los dos idiomas (`now`, `uses`), así que el selector solo cambia el prefijo. En la fase 2 usa el mapa `routes` del Anexo A.3.
- **Navegación principal (MVP):** Ahora · Uses · CV (copy-mvp §4.1). En la fase 2 se suman Proyectos y Casos.
- **Footer:** LinkedIn · GitHub · CV, y debajo "Actualizado en {mes} {año} · Desde Rosario con amor." (copy-mvp §4.6).

> **Regla:** ninguna página de la fase 2 se publica sin su copy. Ni con "próximamente" ni a medias.

---

## 3. Decisiones visuales

| Tema | Decisión | Motivo | Alternativa descartada |
|---|---|---|---|
| Modo | Claro y oscuro **según el sistema**, sin botón. `data-mode="light"` o `"dark"` en un contenedor lo fuerza (para probar) | Respeta lo que eligió el usuario y no agrega controles al header | Forzar con `data-mode` sin botón (la v1): el oscuro no se vería nunca |
| Acento | **Salvia (verde)**, solo en lo interactivo: links, ítem actual del nav, CTA y foco | El acento marca lo que se puede tocar; si lo sacás, la página se entiende igual | Brasa (naranja): ver P1 |
| Neutros | Teñidos de verde (salvia) | El acento se siente parte del sistema | Grises puros |
| Tipografía | Atkinson Hyperlegible Next para el texto y Commit Mono como acento | Atkinson se diseñó para que sea fácil de leer (honesta, cálida, precisa); Commit Mono le da el toque técnico | Schibsted Grotesk, Radio Canada, IBM Plex Sans |
| Elemento de firma | **La ficha técnica en mono** (FactSheet), dentro de cada mini-caso | Es prueba en formato de dato, no necesita imágenes y ya está en el copy | Mini-diagrama de flujo (fase 2) |
| Densidad | Una columna de lectura (`--measure`); filas compactas para la experiencia | Escaneable en 5 segundos | Dos columnas con barra fija (estilo Brittany) |
| Imágenes | **Ninguna en el MVP.** `Media` queda para la fase 2, solo para proyectos sin restricciones | Restricciones de publicación (copy-mvp §1) | — |
| Movimiento | **Sin transiciones** en el MVP. Scroll suave al ancla solo si el usuario no pidió movimiento reducido | La v1 no tiene animaciones, y nada debe retrasar la lectura | Microinteracciones (pueden sumarse después) |

---

## 4. Tipografía

| Rol | Familia | Pesos | Uso |
|---|---|---|---|
| Cuerpo | Atkinson Hyperlegible Next | 400, 600, 700 | Párrafos, filas, nombres (600), etiquetas en negrita de Ahora (700) |
| Títulos | Atkinson Hyperlegible Next | 600 | h1 internos, h2 fuertes, títulos de mini-caso. El h1 del inicio (hero) va en 400 |
| Mono (acento) | Commit Mono | 400, 700 | Header completo (nombre en 700), ficha técnica, fechas, metadatos, encabezados de tabla, "Actualizado el…", flechas → |

**Carga:** Atkinson con `next/font/google` (subsets `latin` y `latin-ext`, variable `--font-sans`). Commit Mono con `next/font/local`, desde los woff2 de `@fontsource/commit-mono` (licencia OFL), variable `--font-mono`. El peso 600 de la mono no se usa, así que no se carga.

```tsx
// app/fonts.ts
import { Atkinson_Hyperlegible_Next } from 'next/font/google';
import localFont from 'next/font/local';

export const sans = Atkinson_Hyperlegible_Next({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

export const mono = localFont({
  src: [
    { path: './fonts/CommitMono-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/CommitMono-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-mono',
});
```

> **Verificar al instalar:** (1) que tu versión de Next exporte `Atkinson_Hyperlegible_Next`; si no, actualizá Next o cargala con `localFont`. (2) Que la **flecha →** se vea bien. Por las dudas, la flecha siempre va en un `<span class="arrow">` con la fuente mono (§8.10).

**Escala** (fluida entre 375 y 1440 px; los valores están en §5.3):

| Token | Mobile → Desktop | Interlineado | Uso |
|---|---|---|---|
| `--text-2xs` | 12 px | `--leading-normal` | Etiquetas en mayúsculas (ficha y tabla, en desktop) |
| `--text-xs` | 13 px | `--leading-normal` | Fechas, metadatos y ficha en mono |
| `--text-sm` | 14 px | `--leading-normal` | Footer, valores de la ficha en desktop |
| `--text-nav` | 14 → 15 px | `--leading-normal` | Header |
| `--text-base` | 15 px | `--leading-normal` | Filas de experiencia, tablas, CTA dentro de un bloque |
| `--text-md` | 16 → 17 px | `--leading-relaxed` | **Párrafos y mini-casos (texto de lectura)** |
| `--text-lg` | 24 → 28 px | `--leading-tight` | h1 de las páginas internas |
| `--text-xl` | 24 → 32 px | `--leading-hero` | h1 del inicio (la frase del hero) |

> **Cambio respecto de la v1 (D7):** la v1 tenía el texto de lectura en 15 px, los metadatos en 11–12,5 px y el h1 en 22 px. Para una web que se lee (mini-casos), subió a 16–17 px. Los demás tamaños subieron en proporción.

---

## 5. Tokens

**La única sección con valores.** Todos los tamaños están en rem (base 16 px).

### 5.1 Color

**Salvia** (`data-theme="salvia"`, recomendado):

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--color-bg` | `oklch(0.9589 0.0135 145.47)` | `oklch(0.1801 0.0202 144.68)` | Fondo |
| `--color-surface` | `oklch(0.985 0.008 145)` | `oklch(0.22 0.020 145)` | Hover de filas (fase 2) |
| `--color-border` | `oklch(0.89 0.015 145)` | `oklch(0.32 0.020 145)` | Líneas del header, footer, ficha y tablas |
| `--color-text-muted` | `oklch(0.48 0.015 145)` | `oklch(0.72 0.015 145)` | Fechas, roles, metadatos, footer, separadores |
| `--color-text` | `oklch(0.1623 0.0105 145.07)` | `oklch(0.96 0.0068 145.52)` | Texto principal |
| `--color-accent` | `oklch(0.4176 0.0943 142.54)` | `oklch(0.836 0.0844 143.26)` | Links, ítem actual del nav, CTA |
| `--color-accent-hover` | `oklch(0.33 0.085 143)` | `oklch(0.90 0.070 144)` | Hover de todo lo que usa acento |
| `--color-focus` | = accent | = accent | Anillo de foco |
| `--color-selection` | accent al 30 % | accent al 30 % | Fondo del texto seleccionado |
| `--color-on-selection` | = text | = text | Texto seleccionado |

**Brasa** (`data-theme="brasa"`, alternativa): mismos roles. **Corrección:** `--color-focus` pasa a ser igual a `--color-accent` (en claro sube de 3,4:1 a 5,1:1).

| Token | Claro | Oscuro |
|---|---|---|
| `--color-bg` | `oklch(0.9905 0.0026 106.45)` | `oklch(0.1208 0.0066 107.35)` |
| `--color-surface` | `oklch(0.965 0.004 60)` | `oklch(0.17 0.006 60)` |
| `--color-border` | `oklch(0.90 0.005 40)` | `oklch(0.28 0.007 40)` |
| `--color-text-muted` | `oklch(0.50 0.008 10)` | `oklch(0.70 0.008 10)` |
| `--color-text` | `oklch(0.2339 0.0095 6.49)` | `oklch(0.9026 0.0067 5.64)` |
| `--color-accent` | `oklch(0.55 0.178 38.5)` | `oklch(0.6545 0.1945 38.5)` |
| `--color-accent-hover` | `oklch(0.46 0.149 38.5)` | `oklch(0.72 0.18 40)` |

### 5.2 Espaciado (escala de 4 px)

| Token | Valor | Uso típico |
|---|---|---|
| `--space-1` | 0.25rem | Entre líneas de una fila, padding de links táctiles |
| `--space-2` | 0.5rem | Etiqueta → contenido, separadores `·` |
| `--space-3` | 0.75rem | Padding de fila, celdas de tabla, gap de la ficha |
| `--space-4` | 1rem | Hero → CTA, título de mini-caso → ficha |
| `--space-5` | 1.25rem | Margen lateral mobile, gap de tabla y de la lista de Ahora |
| `--space-6` | 1.5rem | Padding vertical de la ficha en desktop, apertura → mini-casos |
| `--space-7` | 1.75rem | Footer: borde → contenido |
| `--space-8` | 2rem | Gap de columnas de la ficha |
| `--space-10` | 2.5rem | **h1 → contenido** (unificado) · entre mini-casos |
| `--space-page-top` | `clamp(2.5rem, 1.2676rem + 5.2582vw, 6rem)` | Header → primer contenido |
| `--space-section` | `clamp(3rem, 2.6479rem + 1.5023vw, 4rem)` | Entre secciones del inicio |
| `--space-footer-top` | `clamp(5rem, 4.1197rem + 3.7559vw, 7.5rem)` | Último contenido → footer |
| `--space-footer-bottom` | `clamp(2.5rem, 2.1479rem + 1.5023vw, 3.5rem)` | Debajo del footer |
| `--gutter` | `clamp(1.25rem, 0.6338rem + 2.6291vw, 3rem)` | Padding lateral del header |

### 5.3 Tipografía, forma y layout

| Token | Valor | Uso |
|---|---|---|
| `--text-2xs` | 0.75rem | Etiquetas en mayúsculas |
| `--text-xs` | 0.8125rem | Mono: fechas, metadatos, ficha |
| `--text-sm` | 0.875rem | Footer, valores de la ficha en desktop |
| `--text-nav` | `clamp(0.875rem, 0.8530rem + 0.0939vw, 0.9375rem)` | Header |
| `--text-base` | 0.9375rem | Filas, tablas |
| `--text-md` | `clamp(1rem, 0.9780rem + 0.0939vw, 1.0625rem)` | Texto de lectura |
| `--text-lg` | `clamp(1.5rem, 1.4120rem + 0.3756vw, 1.75rem)` | h1 interno |
| `--text-xl` | `clamp(1.5rem, 1.3239rem + 0.7512vw, 2rem)` | h1 del inicio |
| `--leading-tight` | 1.3 | h1 interno, títulos |
| `--leading-hero` | 1.35 | h1 del inicio |
| `--leading-normal` | 1.5 | Metadatos, footer, filas, tablas |
| `--leading-relaxed` | 1.6 | Texto de lectura |
| `--tracking-tight` | -0.01em | h1 |
| `--tracking-caps` | 0.05em | Mayúsculas |
| `--measure` | 69ch | Ancho de la columna de lectura |
| `--header-height` | 4.5rem | Alto mínimo del header en desktop |
| `--tap-min` | 2.75rem | Área táctil (nav mobile, CTA suelto) |
| `--row-date-col` | 9.75rem | Columna de fecha de la experiencia en desktop |
| `--fact-label-col` | 6.75rem | Etiqueta de la ficha en mobile |
| `--table-cat-col` | 6.875rem | Primera columna de DataTable |
| `--table-item-col` | 15rem | Segunda columna de DataTable |
| `--radius-sm` | 4px | Foco de bloques (unificado 3/4 px) |
| `--radius-md` | 6px | Filas con hover (fase 2) |
| `--dot-size` | 4px | Punto del ítem actual del nav |
| `--border-width` | 1px | Todas las líneas |
| `--focus-width` | 2px | Anillo de foco |
| `--focus-offset` | 2px | Separación del anillo |
| `--underline-offset` | 0.25em | Todos los subrayados (unificado 3/4 px; escala con el texto) |

### 5.4 Código

```css
/* styles/tokens.css */

/* Modo: sigue al sistema (P4). data-mode lo fuerza en cualquier contenedor. */
:root { color-scheme: light dark; }
[data-mode="light"] { color-scheme: light; }
[data-mode="dark"]  { color-scheme: dark; }

[data-theme="salvia"] {
  --color-bg:           light-dark(oklch(0.9589 0.0135 145.47), oklch(0.1801 0.0202 144.68));
  --color-surface:      light-dark(oklch(0.985 0.008 145),      oklch(0.22 0.020 145));
  --color-border:       light-dark(oklch(0.89 0.015 145),       oklch(0.32 0.020 145));
  --color-text-muted:   light-dark(oklch(0.48 0.015 145),       oklch(0.72 0.015 145));
  --color-text:         light-dark(oklch(0.1623 0.0105 145.07), oklch(0.96 0.0068 145.52));
  --color-accent:       light-dark(oklch(0.4176 0.0943 142.54), oklch(0.836 0.0844 143.26));
  --color-accent-hover: light-dark(oklch(0.33 0.085 143),       oklch(0.90 0.070 144));
  --color-focus:        var(--color-accent);
  --color-selection:    color-mix(in oklch, var(--color-accent) 30%, transparent);
  --color-on-selection: var(--color-text);
}

[data-theme="brasa"] {
  --color-bg:           light-dark(oklch(0.9905 0.0026 106.45), oklch(0.1208 0.0066 107.35));
  --color-surface:      light-dark(oklch(0.965 0.004 60),       oklch(0.17 0.006 60));
  --color-border:       light-dark(oklch(0.90 0.005 40),        oklch(0.28 0.007 40));
  --color-text-muted:   light-dark(oklch(0.50 0.008 10),        oklch(0.70 0.008 10));
  --color-text:         light-dark(oklch(0.2339 0.0095 6.49),   oklch(0.9026 0.0067 5.64));
  --color-accent:       light-dark(oklch(0.55 0.178 38.5),      oklch(0.6545 0.1945 38.5));
  --color-accent-hover: light-dark(oklch(0.46 0.149 38.5),      oklch(0.72 0.18 40));
  --color-focus:        var(--color-accent);
  --color-selection:    color-mix(in oklch, var(--color-accent) 30%, transparent);
  --color-on-selection: var(--color-text);
}

:root {
  /* --font-sans y --font-mono las define next/font (app/fonts.ts) */
  --font-body: var(--font-sans), system-ui, sans-serif;
  --font-accent: var(--font-mono), ui-monospace, monospace;

  --text-2xs: 0.75rem;
  --text-xs: 0.8125rem;
  --text-sm: 0.875rem;
  --text-nav: clamp(0.875rem, 0.8530rem + 0.0939vw, 0.9375rem);
  --text-base: 0.9375rem;
  --text-md: clamp(1rem, 0.9780rem + 0.0939vw, 1.0625rem);
  --text-lg: clamp(1.5rem, 1.4120rem + 0.3756vw, 1.75rem);
  --text-xl: clamp(1.5rem, 1.3239rem + 0.7512vw, 2rem);
  --leading-tight: 1.3;
  --leading-hero: 1.35;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
  --tracking-tight: -0.01em;
  --tracking-caps: 0.05em;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-7: 1.75rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-page-top: clamp(2.5rem, 1.2676rem + 5.2582vw, 6rem);
  --space-section: clamp(3rem, 2.6479rem + 1.5023vw, 4rem);
  --space-footer-top: clamp(5rem, 4.1197rem + 3.7559vw, 7.5rem);
  --space-footer-bottom: clamp(2.5rem, 2.1479rem + 1.5023vw, 3.5rem);
  --gutter: clamp(1.25rem, 0.6338rem + 2.6291vw, 3rem);

  --measure: 69ch;
  --header-height: 4.5rem;
  --tap-min: 2.75rem;
  --row-date-col: 9.75rem;
  --fact-label-col: 6.75rem;
  --table-cat-col: 6.875rem;
  --table-item-col: 15rem;

  --radius-sm: 4px;
  --radius-md: 6px;
  --dot-size: 4px;
  --border-width: 1px;
  --focus-width: 2px;
  --focus-offset: 2px;
  --underline-offset: 0.25em;
}
```

---

## 6. Estilos base

- `box-sizing: border-box` en todo.
- La página pinta `--color-bg` y `--color-text`, con la sans en `--text-md`.
- **Links:** acento, **siempre subrayados**; en hover pasan a `--color-accent-hover`. El nav y el selector de idioma no llevan subrayado, porque su contexto ya los identifica como links.
- **Foco:** anillo `--color-focus` con `:focus-visible` en todo lo interactivo. Nunca `outline: none` sin reemplazo.
- **Scroll al ancla:** suave solo si el usuario no pidió movimiento reducido. Los destinos dejan aire arriba.
- **Movimiento reducido:** se apagan las animaciones y las transiciones, por las dudas.
- **Utilidad `.visually-hidden`:** texto que leen los lectores de pantalla y que no se ve (por ejemplo, "se abre en otra pestaña").

```css
/* styles/base.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}

[id] {
  scroll-margin-top: var(--space-8);
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-md);
  line-height: var(--leading-relaxed);
}

h1, h2, h3, p, ul, ol, dl, dd, figure {
  margin: 0;
}

ul, ol {
  padding: 0;
  list-style: none;
}

strong {
  font-weight: 600;
}

a {
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-color: currentColor;
  text-underline-offset: var(--underline-offset);
}

a:hover {
  color: var(--color-accent-hover);
}

:focus-visible {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}

::selection {
  background: var(--color-selection);
  color: var(--color-on-selection);
}

img,
video {
  display: block;
  max-width: 100%;
  height: auto;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Layout

| Propiedad | Valor (token) |
|---|---|
| Ancho de contenido | `--measure`, centrado. En mobile: el ancho total menos `--space-5` de cada lado |
| Margen lateral | `--space-5` (contenido) y `--gutter` (header) |
| Breakpoint | **Uno solo: 48rem (768 px).** Mobile-first: por debajo, la versión mobile se estira. No se puede usar un token dentro de `@media`, así que va escrito en cada consulta |
| Ancho mínimo soportado | 320 px |
| Espacio entre secciones | `--space-section` |
| Header → contenido | `--space-page-top` |
| Contenido → footer | `--space-footer-top`; debajo, `--space-footer-bottom` |

**Header:** borde inferior `--color-border`, fuente mono, **no fijo**.
- **Desktop:** tres columnas. A la izquierda el nombre y el rol (en dos líneas), el nav centrado y ES · EN a la derecha. Alto mínimo `--header-height`.
- **Mobile:** dos filas. Arriba el nombre y el rol, con el idioma a la derecha; abajo el nav, con área táctil `--tap-min`.

**Footer:** dentro de la columna de lectura, con una línea arriba y dos renglones (links, y la línea de actualización). Queda pegado al final del contenido y el espacio que sobra va debajo.

```css
/* styles/layout.css */
body {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.page {
  width: min(var(--measure), 100% - 2 * var(--space-5));
  margin-inline: auto;
  padding-top: var(--space-page-top);
}

.page__section + .page__section {
  margin-top: var(--space-section);
}

.site-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    "brand lang"
    "nav   nav";
  align-items: start;
  row-gap: var(--space-1);
  padding: var(--space-4) var(--gutter) var(--space-1);
  border-bottom: var(--border-width) solid var(--color-border);
}

.site-header__brand { grid-area: brand; }
.site-header__nav   { grid-area: nav; }
.site-header__lang  { grid-area: lang; justify-self: end; }

@media (width >= 48rem) {
  .site-header {
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    grid-template-areas: "brand nav lang";
    align-items: center;
    min-height: var(--header-height);
    padding-block: var(--space-3);
  }
}

.site-footer-wrap {
  flex: 1;
  width: min(var(--measure), 100% - 2 * var(--space-5));
  margin-inline: auto;
  padding-top: var(--space-footer-top);
  padding-bottom: var(--space-footer-bottom);
}
```

---

## 8. Componentes

Todo el CSS va en `styles/components.css`. Los componentes de la **fase 2** están al final (§8.14), sin código: se toman de la v1 cuando haga falta.

### 8.1 SkipLink

| Campo | Valor |
|---|---|
| Clase | `.skip-link` |
| Para qué | Que quien navega con teclado salte directo al contenido |
| Dónde se usa | Todas las páginas, primer elemento del `<body>` |
| Tokens | `--color-bg`, `--color-accent`, `--space-2`, `--space-3`, `--radius-sm`, `--font-accent`, `--text-sm` |
| Estados | Oculto hasta recibir foco; con foco aparece arriba a la izquierda |
| Mobile vs. desktop | Igual |
| Accesibilidad | Apunta a `#contenido` (el `<main>`). Texto: "Saltar al contenido" / "Skip to content" |

```html
<a class="skip-link" href="#contenido">Saltar al contenido</a>
```
```css
/* styles/components.css — SkipLink */
.skip-link {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  z-index: 10;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  font-family: var(--font-accent);
  font-size: var(--text-sm);
  transform: translateY(-200%);
}

.skip-link:focus-visible {
  transform: none;
}
```

### 8.2 SiteHeader

| Campo | Valor |
|---|---|
| Clase | `.site-header` (+ `__brand`, `__name`, `__role`, `__nav`, `__lang`) |
| Para qué | Nombre y rol siempre visibles, navegación e idioma |
| Dónde se usa | Todas las páginas |
| Tokens | `--font-accent`, `--text-nav`, `--color-text`, `--color-text-muted`, `--color-border`, `--gutter`, `--header-height` |
| Estados | El nombre no cambia con hover · focus-visible: anillo |
| Mobile vs. desktop | Ver §7 |
| Accesibilidad | `<header>`; el nombre y el rol forman **un solo link** al inicio del idioma actual. Orden del foco: marca → nav → idioma |

> **Cambio respecto de la v1 (D5):** se suma el rol debajo del nombre. Es una decisión de la Fase 1: nombre y rol siempre visibles.

```html
<header class="site-header">
  <a class="site-header__brand" href="/es">
    <span class="site-header__name">Juan Ignacio Werkalec</span>
    <span class="site-header__role">Senior Full-Stack Engineer</span>
  </a>
  <nav class="site-header__nav site-nav" aria-label="Principal">…</nav>
  <div class="site-header__lang lang-switch">…</div>
</header>
```
```css
/* styles/components.css — SiteHeader */
.site-header {
  font-family: var(--font-accent);
  font-size: var(--text-nav);
  line-height: var(--leading-normal);
}

.site-header__brand {
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  text-decoration: none;
}

.site-header__brand:hover {
  color: var(--color-text);
}

.site-header__name {
  font-weight: 700;
}

.site-header__role {
  color: var(--color-text-muted);
}
```

### 8.3 SiteNav

| Campo | Valor |
|---|---|
| Clase | `.site-nav` (+ `__link`, `__sep`) |
| Para qué | En el MVP: Ahora · Uses · CV |
| Dónde se usa | Dentro de SiteHeader |
| Tokens | `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`, `--tap-min`, `--dot-size`, `--space-1`, `--space-2` |
| Estados | normal (text) · hover (accent) · focus-visible · actual: accent + punto debajo; hover del actual: accent-hover |
| Mobile vs. desktop | Igual. Hace *wrap* si no entra (pantallas de menos de 330 px) |
| Accesibilidad | `<nav aria-label>`; la página actual lleva `aria-current="page"`; los separadores llevan `aria-hidden`. El CV es un PDF y abre en la misma pestaña |

```html
<nav class="site-nav" aria-label="Principal">
  <a class="site-nav__link" href="/es/now" aria-current="page">Ahora</a>
  <span class="site-nav__sep" aria-hidden="true">·</span>
  <a class="site-nav__link" href="/es/uses">Uses</a>
  <span class="site-nav__sep" aria-hidden="true">·</span>
  <a class="site-nav__link" href="/cv-en.pdf">CV</a>
</nav>
```
```css
/* styles/components.css — SiteNav */
.site-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: var(--space-2);
  min-height: var(--tap-min);
}

.site-nav__link {
  position: relative;
  display: flex;
  align-items: center;
  min-height: var(--tap-min);
  color: var(--color-text);
  text-decoration: none;
}

.site-nav__link:hover,
.site-nav__link[aria-current="page"] {
  color: var(--color-accent);
}

.site-nav__link[aria-current="page"]:hover {
  color: var(--color-accent-hover);
}

.site-nav__link[aria-current="page"]::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: var(--space-1);
  width: var(--dot-size);
  height: var(--dot-size);
  margin-left: calc(var(--dot-size) / -2);
  border-radius: 50%;
  background: currentColor;
}

.site-nav__sep {
  color: var(--color-text-muted);
}
```

### 8.4 LangSwitch

| Campo | Valor |
|---|---|
| Clase | `.lang-switch` (+ `__current`, `__link`, `__sep`) |
| Para qué | Pasar a la **misma página** en el otro idioma |
| Dónde se usa | Dentro de SiteHeader |
| Tokens | `--color-text`, `--color-text-muted`, `--color-accent`, `--tap-min`, `--space-2` |
| Estados | Idioma actual: text, no es link · el otro idioma: text-muted · hover: accent · focus-visible |
| Mobile vs. desktop | Igual |
| Accesibilidad | `lang` y `hreflang` en el link; `aria-label` en el grupo. El link mide `--tap-min` de alto (cumple con el área táctil) |

```html
<div class="lang-switch" role="group" aria-label="Idioma">
  <span class="lang-switch__current" aria-current="true">ES</span>
  <span class="lang-switch__sep" aria-hidden="true">·</span>
  <a class="lang-switch__link" href="/en/now" lang="en" hreflang="en">EN</a>
</div>
```
```css
/* styles/components.css — LangSwitch */
.lang-switch {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.lang-switch__current {
  color: var(--color-text);
}

.lang-switch__sep {
  color: var(--color-text-muted);
}

.lang-switch__link {
  display: inline-flex;
  align-items: center;
  min-height: var(--tap-min);
  padding-inline: var(--space-2);
  margin-inline: calc(-1 * var(--space-2));
  color: var(--color-text-muted);
  text-decoration: none;
}

.lang-switch__link:hover {
  color: var(--color-accent);
}
```

### 8.5 SiteFooter

| Campo | Valor |
|---|---|
| Clase | `.site-footer` (+ `__row`, `__sep`, `__note`) |
| Para qué | LinkedIn, GitHub, CV y la línea de actualización |
| Dónde se usa | Todas las páginas, dentro de `.site-footer-wrap` |
| Tokens | `--color-border`, `--color-text-muted`, `--text-sm`, `--leading-normal`, `--space-1`, `--space-2`, `--space-7` |
| Estados | Links: normal (accent, subrayado) · hover (accent-hover) · focus-visible |
| Mobile vs. desktop | Igual. Las filas hacen *wrap* |
| Accesibilidad | `<footer>`. Los links externos abren en otra pestaña y lo avisan con texto oculto. Con el padding, los links llegan a 29 px de alto (WCAG 2.2 AA pide 24 px) |

```html
<footer class="site-footer">
  <p class="site-footer__row">
    <a href="https://www.linkedin.com/in/juan-ignacio-werkalec/" target="_blank" rel="noopener">LinkedIn<span class="visually-hidden"> (se abre en otra pestaña)</span></a>
    <span class="site-footer__sep" aria-hidden="true">·</span>
    <a href="https://github.com/Destras" target="_blank" rel="noopener">GitHub<span class="visually-hidden"> (se abre en otra pestaña)</span></a>
    <span class="site-footer__sep" aria-hidden="true">·</span>
    <a href="/cv-en.pdf">CV</a>
  </p>
  <p class="site-footer__note">Actualizado en noviembre 2026 · Desde Rosario con amor.</p>
</footer>
```
```css
/* styles/components.css — SiteFooter */
.site-footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-7);
  border-top: var(--border-width) solid var(--color-border);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--color-text-muted);
}

.site-footer__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.site-footer a {
  padding-block: var(--space-1);
}
```

### 8.6 Hero

| Campo | Valor |
|---|---|
| Clase | `.hero` (+ `__title`, `__cta`) |
| Para qué | El `h1` del inicio (la frase) y el link "Ver proyectos →" |
| Dónde se usa | Inicio |
| Tokens | `--text-xl`, `--leading-hero`, `--tracking-tight`, `--color-text`, `--space-4` |
| Estados | El CTA: ver CtaLink (§8.10) |
| Mobile vs. desktop | Solo cambia el tamaño, que es fluido |
| Accesibilidad | **La frase es el `h1`** (D3). El nombre ya está en el header y en el `<title>` |

```html
<section class="hero page__section">
  <h1 class="hero__title">Me gusta crear cosas. Tomo features ambiguas con mínimo hand holding y cuido los detalles que separan lo bueno de lo excelente.</h1>
  <a class="hero__cta cta-link" href="#proyectos">Ver proyectos <span class="arrow" aria-hidden="true">→</span></a>
</section>
```
```css
/* styles/components.css — Hero */
.hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.hero__title {
  font-size: var(--text-xl);
  font-weight: 400;
  line-height: var(--leading-hero);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  text-wrap: pretty;
}
```

### 8.7 PageTitle y SectionTitle

| Campo | Valor |
|---|---|
| Clase | `.page-title` (+ `__lead`) · `.section-title` (+ `--strong`) · `.section-lead` |
| Para qué | `h1` de las páginas internas, con bajada opcional · `h2` de cada sección (etiqueta o fuerte) · párrafo de apertura de una sección |
| Dónde se usa | PageTitle: Ahora, Uses, 404, Proyectos. SectionTitle: Proyectos y Experiencia del inicio. SectionLead: la apertura de Proyectos |
| Tokens | `--text-lg`, `--text-md`, `--text-base`, `--leading-tight`, `--tracking-tight`, `--color-text`, `--color-text-muted`, `--space-2`, `--space-4`, `--space-6`, `--space-10` |
| Estados | No son interactivos |
| Mobile vs. desktop | Igual |
| Accesibilidad | Un solo `h1` por página; los `h2` van debajo, en orden |

```html
<header class="page-title">
  <h1>Uses</h1>
  <p class="page-title__lead">Uso IA todos los días. La IA acelera; el criterio sigue siendo mío.</p>
</header>

<h2 class="section-title" id="proyectos">Proyectos</h2>
<p class="section-lead">En Harness fui el único ingeniero de UI y Backend for Frontend (BFF) de …</p>
```
```css
/* styles/components.css — PageTitle y SectionTitle */
.page-title {
  margin-bottom: var(--space-10);
}

.page-title h1 {
  font-size: var(--text-lg);
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.page-title__lead {
  margin-top: var(--space-4);
  font-size: var(--text-md);
  color: var(--color-text);
  text-wrap: pretty;
}

.section-title {
  margin-bottom: var(--space-2);
  font-size: var(--text-base);
  font-weight: 400;
  color: var(--color-text-muted);
}

.section-title--strong {
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--color-text);
}

.section-lead {
  margin-bottom: var(--space-6);
  text-wrap: pretty;
}
```

### 8.8 ExperienceList

| Campo | Valor |
|---|---|
| Clase | `.exp-list`, `.exp-row` (+ `__date`, `__head`, `__org`, `__role`, `__summary`) |
| Para qué | La trayectoria: una fila por etapa, **no clickeable** en el MVP (no hay páginas de detalle) |
| Dónde se usa | Inicio (Trabajo destacado) y /proyectos (secciones Proyectos y Experiencia) |
| Tokens | `--font-accent`, `--text-xs`, `--text-base`, `--text-sm`, `--leading-normal`, `--color-text`, `--color-text-muted`, `--color-border`, `--row-date-col`, `--space-1`, `--space-3`, `--space-4` |
| Estados | Sin estados (estática) |
| Mobile vs. desktop | Mobile: fecha arriba; debajo, "**Empresa** · rol" y el resumen. Desktop: dos columnas, con la fecha a la izquierda y el resto a la derecha |
| Accesibilidad | `<ul>` con `<li>`; el período va en `<time>` cuando es una fecha concreta |

> **Cambio respecto de la v1 (D8):** la fila de la v1 tenía 5 columnas y era un link. Como en el MVP no hay detalle y el rol "Full-Stack Engineer y Technical Lead" no entra en una columna angosta, la fila pasa a 2 columnas. La versión clickeable vuelve en la fase 2.
> **Orden** (copy-mvp §4.4): Freelance (sigue activo) → Harness → Split.io → MangooDev. Sin nota: Harness y Split.io son un solo empleo mostrado en dos entradas (decisión del 2026-11-24). En /proyectos el freelance no va en Experiencia: su trabajo es la fila de la sección Proyectos (§9.5).

```html
<ul class="exp-list">
  <li class="exp-row">
    <span class="exp-row__date">abr 2026 – actualidad</span>
    <div>
      <p class="exp-row__head"><span class="exp-row__org">Freelance</span> · <span class="exp-row__role">Full-Stack Engineer y Technical Lead</span></p>
      <p class="exp-row__summary">Plataforma de seguimiento clínico: web para terapeutas y app para pacientes, en producción.</p>
    </div>
  </li>
  <!-- Harness · jun 2024 – oct 2026 / Split.io · ene 2022 – jun 2024 / MangooDev SRL · dic 2020 – ene 2022 -->
</ul>
```
```css
/* styles/components.css — ExperienceList */
.exp-list {
  display: flex;
  flex-direction: column;
  border-top: var(--border-width) solid var(--color-border);
}

.exp-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-block: var(--space-3);
  border-bottom: var(--border-width) solid var(--color-border);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.exp-row__date {
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.exp-row__head {
  color: var(--color-text-muted);
}

.exp-row__org {
  font-weight: 600;
  color: var(--color-text);
}

.exp-row__summary {
  color: var(--color-text);
  text-wrap: pretty;
}

@media (width >= 48rem) {
  .exp-row {
    display: grid;
    grid-template-columns: var(--row-date-col) minmax(0, 1fr);
    column-gap: var(--space-4);
    align-items: baseline;
  }
}
```

### 8.9 MiniCase

| Campo | Valor |
|---|---|
| Clase | `.mini-case-list`, `.mini-case` (+ `__title`, `__org`, `__story`) |
| Para qué | **La prueba de "cómo pienso":** título, ficha técnica (FactSheet) y Problema → Decisión → (Lo que cambiaría) → Resultado |
| Dónde se usa | Inicio, sección Proyectos (3 mini-casos; copy-mvp §4.3) |
| Tokens | `--text-md`, `--leading-tight`, `--leading-relaxed`, `--color-text`, `--color-text-muted`, `--space-2`, `--space-4`, `--space-10` |
| Estados | No es interactivo en el MVP |
| Mobile vs. desktop | Igual; la ficha cambia según §8.11 |
| Accesibilidad | `<article>` con `h3`; las etiquetas Problema, Decisión, etc. van en `<strong>` |

> **Cambio respecto de la v1 (D9):** la v1 llamaba "MiniCase" a un bloque por empresa, sin ficha y clickeable (Inicio V1). Acá el mini-caso es el de `copy-mvp` §4.3. El bloque de la v1 pasa a la fase 2 con el nombre **WorkBlock**.
> **El mini-caso 1 tiene 4 líneas** ("Lo que cambiaría") y una ficha con dos valores en Duración y en Estado. El componente lo soporta sin cambios.

```html
<div class="mini-case-list">
  <article class="mini-case">
    <h3 class="mini-case__title">Configs y AI Configs <span class="mini-case__org">· Harness</span></h3>
    <dl class="fact-sheet fact-sheet--cols-2">
      <div class="fact-sheet__item"><dt>Rol</dt><dd>Único ingeniero de UI y BFF</dd></div>
      <div class="fact-sheet__item"><dt>Duración</dt><dd><span>Configs: mar–may 2026</span><span>AI Configs: ~2 meses</span></dd></div>
      <div class="fact-sheet__item"><dt>Stack</dt><dd>React, TypeScript, GraphQL (BFF en Node.js)</dd></div>
      <div class="fact-sheet__item"><dt>Estado</dt><dd><span>Configs: beta abierta</span><span>AI Configs: en producción</span></dd></div>
    </dl>
    <div class="mini-case__story">
      <p><strong>Problema:</strong> …</p>
      <p><strong>Decisión:</strong> …</p>
      <p><strong>Lo que cambiaría:</strong> …</p>
      <p><strong>Resultado:</strong> …</p>
    </div>
  </article>
</div>
```
```css
/* styles/components.css — MiniCase */
.mini-case-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.mini-case {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.mini-case__title {
  font-size: var(--text-md);
  font-weight: 600;
  line-height: var(--leading-tight);
}

.mini-case__org {
  font-weight: 400;
  color: var(--color-text-muted);
}

.mini-case__story {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  line-height: var(--leading-relaxed);
}

.mini-case__story p {
  text-wrap: pretty;
}
```

### 8.10 CtaLink

| Campo | Valor |
|---|---|
| Clase | `.cta-link` · `.arrow` |
| Para qué | Link de acción con flecha ("Ver proyectos →", "Volver al inicio →") |
| Dónde se usa | Hero, 404 |
| Tokens | `--color-accent`, `--color-accent-hover`, `--text-md`, `--font-accent`, `--tap-min` |
| Estados | normal (accent, subrayado) · hover (accent-hover) · focus-visible |
| Mobile vs. desktop | En mobile mide `--tap-min` de alto |
| Accesibilidad | El texto dice adónde lleva. La flecha es decorativa (`aria-hidden`) y va en mono, por si la sans no tiene el glifo |

```html
<a class="cta-link" href="#proyectos">Ver proyectos <span class="arrow" aria-hidden="true">→</span></a>
```
```css
/* styles/components.css — CtaLink */
.cta-link {
  align-self: flex-start;
  font-size: var(--text-md);
}

.arrow {
  font-family: var(--font-accent);
}

@media (width < 48rem) {
  .cta-link {
    display: inline-flex;
    align-items: center;
    min-height: var(--tap-min);
  }
}
```

### 8.11 FactSheet (elemento de firma)

| Campo | Valor |
|---|---|
| Clase | `.fact-sheet` (+ `--cols-2`, `__item`) |
| Para qué | Ficha técnica: rol, duración o contexto, stack y estado |
| Dónde se usa | Dentro de cada MiniCase (`--cols-2`). En la fase 2, también en los detalles (3 columnas) |
| Tokens | `--font-accent`, `--text-2xs`, `--text-xs`, `--text-sm`, `--tracking-caps`, `--leading-normal`, `--color-text`, `--color-text-muted`, `--color-border`, `--fact-label-col`, `--space-1`, `--space-2`, `--space-3`, `--space-6`, `--space-8` |
| Estados | No es interactiva |
| Mobile vs. desktop | Mobile: un dato por fila, con la etiqueta a la izquierda y ancho fijo. Desktop: grilla, con la etiqueta en mayúsculas arriba del valor |
| Accesibilidad | `<dl>` con `<dt>` y `<dd>` agrupados en `<div>` |

```css
/* styles/components.css — FactSheet */
.fact-sheet {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-block: var(--space-3);
  border-block: var(--border-width) solid var(--color-border);
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  line-height: var(--leading-normal);
}

.fact-sheet__item {
  display: flex;
  gap: var(--space-3);
  min-width: 0;
}

.fact-sheet dt {
  flex: none;
  width: var(--fact-label-col);
  color: var(--color-text-muted);
}

.fact-sheet dd {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
  color: var(--color-text);
}

@media (width >= 48rem) {
  .fact-sheet {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-6) var(--space-8);
    padding-block: var(--space-6);
  }

  .fact-sheet--cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .fact-sheet__item {
    flex-direction: column;
    gap: var(--space-2);
  }

  .fact-sheet dt {
    width: auto;
    font-size: var(--text-2xs);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }

  .fact-sheet dd {
    font-size: var(--text-sm);
  }
}
```

### 8.12 DataTable

| Campo | Valor |
|---|---|
| Clase | `.data-table` (+ `__cat`, `__item`, `__note`) |
| Para qué | Tabla de tres columnas: categoría, ítem y comentario |
| Dónde se usa | Uses (en la fase 2, también Colofón) |
| Tokens | `--font-accent`, `--text-2xs`, `--text-xs`, `--text-base`, `--tracking-caps`, `--leading-normal`, `--color-text`, `--color-text-muted`, `--color-border`, `--table-cat-col`, `--table-item-col`, `--space-1`, `--space-3`, `--space-5` |
| Estados | No es interactiva |
| Mobile vs. desktop | Mobile: cada fila es un bloque, sin encabezado visible. Desktop: tabla con encabezado en mayúsculas |
| Accesibilidad | `<table>` real con `<th scope="col">` y `<caption>` oculto. En mobile el encabezado no se ve, pero se lee |

```html
<table class="data-table">
  <caption class="visually-hidden">Herramientas que uso</caption>
  <thead>
    <tr><th scope="col">Categoría</th><th scope="col">Ítem</th><th scope="col">Comentario</th></tr>
  </thead>
  <tbody>
    <tr>
      <td class="data-table__cat">Editor</td>
      <td class="data-table__item">VS Code</td>
      <td class="data-table__note">Lo de siempre: rápido, extensible, sin sorpresas.</td>
    </tr>
  </tbody>
</table>
```
```css
/* styles/components.css — DataTable */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.data-table th {
  padding: 0 0 var(--space-3);
  border-bottom: var(--border-width) solid var(--color-border);
  font-family: var(--font-accent);
  font-size: var(--text-2xs);
  font-weight: 400;
  letter-spacing: var(--tracking-caps);
  text-align: left;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.data-table td {
  padding: var(--space-3) 0;
  border-bottom: var(--border-width) solid var(--color-border);
  vertical-align: baseline;
}

.data-table th + th,
.data-table td + td {
  padding-left: var(--space-5);
}

.data-table th:nth-child(1) { width: var(--table-cat-col); }
.data-table th:nth-child(2) { width: var(--table-item-col); }

.data-table__cat {
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.data-table__item {
  font-weight: 600;
  color: var(--color-text);
}

.data-table__note {
  color: var(--color-text-muted);
  text-wrap: pretty;
}

@media (width < 48rem) {
  .data-table thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .data-table tbody {
    display: block;
    border-top: var(--border-width) solid var(--color-border);
  }

  .data-table tr {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding-block: var(--space-3);
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .data-table td,
  .data-table td + td {
    padding: 0;
    border: 0;
  }

  .data-table__cat {
    font-size: var(--text-2xs);
  }
}
```

### 8.13 NowList

| Campo | Valor |
|---|---|
| Clase | `.now-updated`, `.now-list` |
| Para qué | La fecha de actualización y lo que estás haciendo ahora |
| Dónde se usa | Ahora |
| Tokens | `--font-accent`, `--text-xs`, `--leading-normal`, `--leading-relaxed`, `--color-text`, `--color-text-muted`, `--space-2`, `--space-5`, `--space-10` |
| Estados | El link de la línea de actualización: normal · hover · focus-visible |
| Mobile vs. desktop | Igual |
| Accesibilidad | `<ul>`; la etiqueta va en `<strong>` (700); la fecha, en `<time datetime>` |

```html
<header class="page-title">
  <h1>Ahora</h1>
  <p class="now-updated">Actualizado el <time datetime="2026-11-20">20 de noviembre de 2026</time>. Inspirado en <a href="https://nownownow.com">nownownow.com</a>.</p>
</header>
<ul class="now-list">
  <li><strong>Trabajando en:</strong> la plataforma de seguimiento clínico, …</li>
</ul>
```
```css
/* styles/components.css — NowList */
.now-updated {
  margin-top: var(--space-2); /* va dentro de .page-title, debajo del h1 */
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  line-height: var(--leading-normal);
  color: var(--color-text-muted);
}

.now-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  line-height: var(--leading-relaxed);
}

.now-list strong {
  font-weight: 700;
}

.now-list li {
  text-wrap: pretty;
}
```

### 8.14 Componentes de la fase 2 (sin código en el MVP)

Se toman de la v1 de Claude Design cuando existan las páginas. **No van en `components.css` del MVP.**

| Componente | Qué es | Antes de usarlo |
|---|---|---|
| **WorkBlock** | El "MiniCase" de la v1: un bloque por empresa con un link que cubre todo el bloque y un CTA encima | Decidir si reemplaza a la experiencia |
| **ExperienceList clickeable** | La fila de 5 columnas de la v1, con hover y flecha | Reforzar el hover (surface/bg es 1,08:1, casi invisible); sumar `:focus-visible` a la flecha |
| **Media** | Imagen, gif o video del detalle | **Nunca** con capturas de Harness ni con datos de pacientes |
| **Options** | Comparación A vs. B del caso de estudio | Escribir el caso completo |
| **Proceso** | Bloques de subtítulo y párrafo | Escribir el copy |

---

## 9. Páginas

Todas usan: `SkipLink` → `SiteHeader` → `<main id="contenido" class="page">` → `.site-footer-wrap` + `SiteFooter`.

### 9.1 Inicio — `/es` / `/en`
- **h1:** la frase del hero (copy-mvp §4.2).
- **Meta title / description:** copy-mvp §4.9.
- **Secciones, en orden:**

  | # | Sección | Componente | Copy |
  |---|---|---|---|
  | 1 | Hero + "Ver proyectos →" | Hero, CtaLink | copy-mvp §4.2 |
  | 2 | Proyectos (`#proyectos`) | SectionTitle + SectionLead + MiniCase ×3 (con FactSheet) | copy-mvp §4.3 + etiquetas de §14.4 |
  | 3 | Experiencia | SectionTitle + ExperienceList + nota | copy-mvp §4.4 + nota de §14.4 |
  | 4 | Cierre | Párrafo con link en "LinkedIn" | copy-mvp §4.5 |

- **Mobile:** las fichas pasan a una fila por dato; la experiencia, a filas apiladas.
- **Referencia visual:** "Final webpage" (estilos) + este documento (estructura).

### 9.2 Ahora — `/es/now` / `/en/now`
- **h1:** Ahora / Now.
- **Meta:** title "Ahora · Juan Ignacio Werkalec" / "Now · Juan Ignacio Werkalec"; la description es el primer ítem de la lista.
- **Secciones:** PageTitle → NowList (copy-mvp §4.7).
- **Referencia:** Ahora-desktop-final, Ahora-mobile-final.

### 9.3 Uses — `/es/uses` / `/en/uses`
- **h1:** Uses.
- **Meta:** title "Uses · Juan Ignacio Werkalec"; la description es la bajada.
- **Secciones:** PageTitle con bajada (la línea sobre la IA) → DataTable de 6 filas (copy-mvp §4.8).
- **Referencia:** Uses-desktop-final, Uses-mobile-final.

### 9.4 404 — `app/not-found.tsx`
- **h1:** "Esta página no existe." y, debajo, "This page doesn't exist." (bilingüe: ver el Anexo A.3).
- **Secciones:** PageTitle → dos CtaLink: "Volver al inicio →" (`/es`) y "Back home →" (`/en`) (copy-mvp §4.9).
- **Meta:** `noindex`.

### 9.5 Proyectos — `/es/proyectos` / `/en/projects`
- **h1:** Proyectos / Projects. Sin bajada.
- **Meta:** title "Proyectos · Juan Ignacio Werkalec" / "Projects · Juan Ignacio Werkalec"; description en copy-mvp §4.9.
- **Secciones, en orden:**

  | # | Sección | Componente | Datos |
  |---|---|---|---|
  | 1 | Título | PageTitle | Diccionario (`projects.title`) |
  | 2 | Proyectos | SectionTitle + ExperienceList | Colección `projects` (`src/data/projects.json`): la plataforma clínica |
  | 3 | Experiencia | SectionTitle + ExperienceList | Colección `experiences` (`src/data/experiences.json`): Harness, Split.io, MangooDev SRL |

- **Filas fijas** (sin flecha ni link) hasta que existan las páginas de detalle. Sin nota debajo de la experiencia.
- **Referencia visual:** wireframe `proyectos` (el orden de las secciones está invertido a propósito).
- **Spec:** `design/pages/projects.md` (decisiones D-P1…D-P8 del 2026-11-24).

---

## 10. Interacción y movimiento

| Elemento | Hover | Foco | Actual | Transición |
|---|---|---|---|---|
| Link de texto, footer y CTA | accent → accent-hover | Anillo | — | Ninguna |
| Ítem del nav | text → accent | Anillo | accent + punto; con hover, accent-hover | Ninguna |
| EN / ES | text-muted → accent | Anillo | El actual en text, no es link | Ninguna |
| Marca (nombre y rol) | Sin cambio | Anillo | — | — |
| Skip link | — | Aparece | — | Ninguna |

- **Scroll al ancla:** suave (`scroll-behavior: smooth`) salvo con movimiento reducido. Los destinos tienen `scroll-margin-top: --space-8`.
- **Header al scrollear:** no es fijo.
- **Movimiento reducido:** se apagan las animaciones y las transiciones.
- **Links externos (LinkedIn, GitHub, nownownow):** abren en otra pestaña con `rel="noopener"` y avisan con texto oculto. El CV abre en la misma pestaña.

---

## 11. Accesibilidad y contraste

### 11.1 Contraste (WCAG 2.2 AA)
Calculado desde los valores OKLCH, recortados a sRGB. Coincide con el cálculo de la v1.

**Salvia** (recomendada)

| Par | Mínimo | Claro | Oscuro | ¿Pasa? |
|---|---|---|---|---|
| text / bg | 4.5:1 | 17.2:1 | 16.7:1 | ✅ |
| text-muted / bg | 4.5:1 | 5.8:1 | 7.6:1 | ✅ |
| text / surface | 4.5:1 | 18.6:1 | 15.4:1 | ✅ |
| accent / bg | 4.5:1 | 7.3:1 | 11.7:1 | ✅ |
| accent-hover / bg | 4.5:1 | 10.6:1 | 14.2:1 | ✅ |
| focus / bg | 3:1 | 7.3:1 | 11.7:1 | ✅ |

**Brasa** (con el foco corregido)

| Par | Mínimo | Claro | Oscuro | ¿Pasa? |
|---|---|---|---|---|
| text / bg | 4.5:1 | 16.3:1 | 15.1:1 | ✅ |
| text-muted / bg | 4.5:1 | 5.9:1 | 7.6:1 | ✅ |
| text / surface | 4.5:1 | 15.1:1 | 14.3:1 | ✅ |
| accent / bg | 4.5:1 | 5.1:1 | 5.9:1 | ✅ |
| accent-hover / bg | 4.5:1 | 7.4:1 | 7.6:1 | ✅ |
| focus / bg | 3:1 | 5.1:1 | 5.9:1 | ✅ |

> **surface / bg (1,08:1)** no es un requisito de WCAG, porque el hover no es la única forma de identificar el elemento. Pero se ve poco. En el MVP no hay hovers de fondo, así que no afecta. Para la fase 2, ver §14.3.

### 11.2 Checklist
- [x] Un solo `h1` por página; `h2` y `h3` en orden (el inicio ahora tiene `h1`).
- [x] Link "Saltar al contenido" (§8.1).
- [ ] Foco visible en todo lo interactivo, siguiendo el orden visual. Está definido; falta probarlo en un navegador.
- [x] Áreas táctiles: el nav, el idioma y el CTA miden 44 px; el footer, 29 px (el mínimo AA es 24). Los links dentro de un texto están exentos.
- [x] Links distinguibles sin depender del color: subrayados en el texto y el footer; el nav se marca con un punto.
- [ ] `lang` correcto en `<html>` (sale de la ruta) y `lang="en"` en el link EN del selector. Falta probarlo.
- [x] Texto en rem: respeta el tamaño de letra que eligió el usuario.
- [ ] Probar con zoom al 200 % y a 320 px de ancho.

---

## 12. Assets

| Archivo | Medidas / formato | Contenido | Estado |
|---|---|---|---|
| `app/icon.svg` (favicon) | SVG con `prefers-color-scheme` adentro | Monograma "JW" en Commit Mono 700, en acento sobre transparente | ☐ |
| `app/apple-icon.png` | 180 × 180 | El monograma sobre `--color-bg` claro | ☐ |
| `public/og-es.png` / `og-en.png` | 1200 × 630 | Nombre + rol + "Me gusta crear cosas." / "I like building things.", solo texto, con los colores de la paleta | ☐ |
| `public/cv-en.pdf` | PDF | Con las fechas corregidas (copy-mvp §7). Por ahora no hay versión en español | ☐ |
| `app/fonts/CommitMono-400.woff2`, `-700.woff2` | woff2, subset latin | De `@fontsource/commit-mono` (OFL) | ☐ |

---

## 13. Supuestos

| # | Qué se supuso | Dónde | Por qué | ¿Confirmado? |
|---|---|---|---|---|
| S1 | Nombres de tokens y paso de px a rem | §5 | La v1 estaba en px | ✅ (v1) |
| S2 | Interpolación lineal entre 375 y 1440 px | §5 | Solo hay artboards en esos dos anchos | ✅ (v1) |
| S3 | `--measure: 69ch` | §5.3 | Medido sobre la columna de 720 px | ✅ (v1) |
| S4 | Breakpoint único de 48rem y ancho mínimo de 320 px | §7 | El diseño no lo define | ☐ |
| S5 | Tamaños de lectura de 16 a 17 px (y el resto en proporción) | §4, §5.3 | Pedido de la Fase 6 para texto largo | ☐ |
| S6 | Recomendaciones de P1 a P6 aplicadas | Todo | Para no bloquear el documento | ✅ (2026-11-24) |
| S7 | Etiquetas nuevas de copy (§14.4) | §8, §9 | `copy-mvp` no tiene títulos de sección ni etiquetas de la ficha en EN | ☐ |
| S8 | Sin transiciones en el MVP | §3, §10 | La v1 no las tiene | ☐ |
| S9 | 404 bilingüe en `app/not-found.tsx` | §9.4 | En Next, la 404 global no sabe el idioma de la ruta | ☐ |
| S10 | CSS propio con BEM, sin Tailwind | Anexo A | El handoff ya viene en CSS; traducirlo a utilidades es trabajo extra | ☐ |
| S11 | Next.js 15 o posterior | §4, Anexo A | `params` como Promise | ☐ |

---

## 14. Desvíos y pendientes

### 14.1 Desvíos respecto de la v1 de Claude Design (y por qué)

| # | v1 | v2 (este documento) | Motivo |
|---|---|---|---|
| D1 | Modo forzado con `data-mode`, nunca según el sistema | Según el sistema; `data-mode` solo para probar | Sin un botón, el modo oscuro no aparecía nunca (P4) |
| D2 | Rutas sin prefijo de idioma | `/es/…` y `/en/…` | `copy-mvp` §2 y el selector de idioma |
| D3 | El inicio no tiene `h1` | El hero es el `h1` | Accesibilidad y SEO |
| D4 | Nav: Proceso · Proyectos · Casos | Ahora · Uses · CV | Alcance del MVP (P2) y `copy-mvp` §4.1 |
| D5 | Solo el nombre en el header | Nombre y rol | Fase 1: nombre y rol siempre visibles |
| D6 | Foco de Brasa fijo (3,4:1 en claro) | Foco = acento (5,1:1) | Contraste |
| D7 | Texto de lectura de 15 px, metadatos de 11 a 12,5 px | 16–17 px y 12–13 px | Lectura de texto largo |
| D8 | Experiencia en filas clickeables de 5 columnas | Filas estáticas de 2 columnas | No hay detalle en el MVP y el rol no entraba |
| D9 | "MiniCase" = bloque por empresa sin ficha | MiniCase = mini-caso de `copy-mvp` con ficha | Es la prueba de "cómo pienso" (advertencia 1 de las conclusiones) |
| D10 | Footer con Ahora · Uses · Colofón | Solo LinkedIn · GitHub · CV y la nota | Ahora y Uses ya están en el nav; Colofón es de la fase 2 |
| D11 | EN y footer sin área táctil suficiente | EN de 44 px; footer de 29 px | Áreas táctiles |
| D12 | Interlineados 1.45/1.5/1.55/1.6; radios de 3, 4 y 6 px; subrayados de 3 y 4 px | 1.5/1.6; 4 y 6 px; 0.25em | Unificación (§14.2 de la v1) |

### 14.2 Contradicciones con `copy-mvp.md` (resueltas)
- **P5, LinkedIn:** se mantiene como CTA del cierre.
- **P6, nombres:** se nombran Harness, Split.io y MangooDev SRL, como en `copy-mvp`.

### 14.3 Pendientes para la fase 2
- [ ] Copy de Proyectos, detalles, Casos, Proceso y Colofón.
- [ ] Hover visible para las filas y bloques clickeables (por ejemplo, un token `--color-hover` con un poco más de diferencia, o un borde).
- [ ] `:focus-visible` en la flecha de las filas, igual que el hover.
- [ ] Rutas EN de la fase 2 (las de §2 son una propuesta).

### 14.4 Copy a agregar a `copy-mvp.md` (no existe todavía)

| Dónde | ES | EN |
|---|---|---|
| Título de la sección de proyectos | Proyectos | Projects |
| Título de la sección de experiencia | Experiencia | Experience |
| Etiquetas de la ficha | Rol · Duración · Contexto · Stack · Estado | Role · Duration · Context · Stack · Status |
| Etiquetas del mini-caso | Problema · Decisión · Lo que cambiaría · Resultado | Problem · Decision · What I'd change · Result |
| Skip link | Saltar al contenido | Skip to content |
| `aria-label` del nav y del idioma | Principal · Idioma | Main · Language |
| Aviso de pestaña nueva | (se abre en otra pestaña) | (opens in a new tab) |
| Encabezados de la tabla de Uses | Categoría · Ítem · Comentario | Category · Item · Note |
| Caption de la tabla de Uses | Herramientas que uso | Tools I use |
| Mes de "Actualizado en…" | noviembre 2026 | November 2026 |

---

## Anexo A — Plan de implementación

### A.1 Stack
- **Next.js (App Router, 15 o posterior) + TypeScript.** CSS propio en 4 archivos (tokens, base, layout, components), importados en el layout. **Sin Tailwind** (S10).
- **Contenido** en diccionarios tipados (`content/es.ts`, `content/en.ts`), no en un CMS.
- **Deploy:** Vercel, con el dominio juaniw.com.
- **Analytics:** después del lanzamiento (Plausible, Umami o Vercel Analytics, sin cookies).

### A.2 Estructura de carpetas
```
app/
├── [lang]/
│   ├── layout.tsx          ← <html lang>, data-theme, fuentes, header y footer
│   ├── page.tsx            ← Inicio
│   ├── now/page.tsx
│   └── uses/page.tsx
├── not-found.tsx           ← 404 bilingüe
├── fonts.ts
├── fonts/                  ← CommitMono-400.woff2, -700.woff2
├── icon.svg
├── apple-icon.png
├── sitemap.ts
└── robots.ts
components/                 ← SkipLink, SiteHeader, SiteNav, LangSwitch, SiteFooter,
                              Hero, PageTitle, SectionTitle, MiniCase, FactSheet,
                              ExperienceList, CtaLink, DataTable, NowList
content/
├── types.ts                ← type Content (la forma de todo el copy)
├── es.ts
└── en.ts
lib/
└── i18n.ts                 ← locales, getContent(lang), alternates()
styles/
├── tokens.css · base.css · layout.css · components.css
proxy.ts                    ← redirección por idioma (middleware.ts en Next 15)
public/
├── cv-en.pdf · og-es.png · og-en.png
design/                     ← este archivo, copy-mvp.md y lo demás de diseño
```

### A.3 Idiomas y rutas
- `app/[lang]` con `generateStaticParams()` que devuelve `es` y `en`, y `dynamicParams = false` para que cualquier otro idioma dé 404.
- **`proxy.ts`** (se llama `middleware.ts` en Next 15): si la ruta no empieza con `/es` o `/en` (y no es un asset ni un PDF), redirige con 307 a `/{lang}{ruta}`, según el primer idioma de `Accept-Language`.
- **Selector de idioma:** en el MVP, cambia el prefijo de la ruta actual (`usePathname`). En la fase 2, usa un mapa `routes` por idioma (`proyectos` ↔ `projects`).
- **404:** `app/not-found.tsx` es bilingüe, porque la 404 global de Next no recibe el idioma de la ruta.

### A.4 Metadatos y SEO
- `generateMetadata` en cada página: `title` y `description` de copy-mvp §4.9.
- `alternates.languages`: `{ es: '/es/…', en: '/en/…', 'x-default': '/' }`. Genera los `hreflang`.
- `openGraph.images`: `og-es.png` u `og-en.png`, según el idioma.
- `sitemap.ts` con las 6 URLs del MVP (3 páginas × 2 idiomas) y `robots.ts` que permite todo y apunta al sitemap.
- `metadataBase: new URL('https://juaniw.com')`.

### A.5 Orden para programar
1. Proyecto, estilos, fuentes y layout con `data-theme` → probar los dos modos con una página vacía.
2. Rutas `[lang]`, `proxy.ts` y diccionarios con el copy completo, incluidos los textos de §14.4.
3. Componentes de estructura: SkipLink, SiteHeader, SiteNav, LangSwitch y SiteFooter.
4. Inicio: Hero, SectionTitle, MiniCase con FactSheet y ExperienceList.
5. Ahora, Uses (NowList, DataTable) y la 404.
6. Metadatos, OG, iconos, sitemap y robots.
7. Prueba final (A.6), deploy y LinkedIn actualizado.

### A.6 Definición de terminado
- [ ] Lighthouse: 95 o más en Rendimiento, Accesibilidad, Buenas prácticas y SEO, en mobile.
- [ ] axe DevTools sin errores, en las 3 páginas y en los 2 idiomas.
- [ ] Recorrido completo con teclado: skip link, foco visible, orden lógico.
- [ ] Modo claro y oscuro (cambiando el sistema), y `data-mode` para forzar cada uno.
- [ ] `prefers-reduced-motion`: el ancla salta sin animación.
- [ ] 320, 375, 768 y 1440 px, y zoom al 200 %: nada se desborda.
- [ ] `/` redirige según el idioma; ES ↔ EN mantiene la página; `hreflang` correcto.
- [ ] Probado en Safari (incluido iOS), Chrome y Firefox, y en Windows o Android.
- [ ] El texto coincide palabra por palabra con `copy-mvp.md`, y pasa el `grep` de palabras prohibidas.
- [ ] Los PDFs del CV abren y coinciden con la web.

---

## Anexo B — Checklist de arranque (antes de la primera línea de código)

- [x] Resolver P1 a P6 (confirmadas el 2026-11-24).
- [ ] Agregar a `copy-mvp.md` los textos de §14.4, en ES y EN.
- [ ] Exportar `cv-en.pdf` con las fechas corregidas (por ahora no hay versión en español).
- [ ] Bajar los woff2 de Commit Mono (400 y 700).
- [ ] Crear el favicon y las 2 imágenes OG (pueden esperar hasta el paso 6 de A.5, pero no hasta el deploy).
- [ ] Copiar en `design/` del repo: este archivo y `copy-mvp.md`.
