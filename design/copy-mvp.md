# Copy del MVP (Fase 3)

> Todo el texto del MVP, en ES y EN, con el mapa del sitio y las decisiones que lo sostienen.
> **Fuentes:** el CV (`juan ignacio werkalec.pdf`) es la fuente de verdad. [datos.md](datos.md) completa lo que el CV no dice. Si no está en una de las dos, no va en la web.
> Versión del 2026-11-20, cerrada después de tres rondas de preguntas.

---

## 1. Decisiones

| Tema | Decisión | Por qué |
|---|---|---|
| Nombre | **Juan Ignacio Werkalec** | Así figura en el CV y en LinkedIn |
| Rol | **Senior Full-Stack Engineer** | Igual que el CV y el titular de LinkedIn. En Experiencia se mantiene el título real (Senior Frontend Engineer), que es el que alguien puede verificar |
| Hero | Versión 2 | Tiene lo que más te gustó de tus frases: "me gusta crear cosas" y "los detalles que separan lo bueno de lo excelente". La prueba va justo abajo, en la apertura de proyectos |
| Humor | Solo una pizca en /now | Tu humor es áspero y ambiguo; en el copy principal se puede leer mal |
| Spanglish | Términos aceptados sí (*feature, deploy, ownership, end to end, hand holding*); verbos inventados no (*ownear, redeployar*) | Suena a dev sin sonar a jerga de Slack |
| Adjetivos | **Autónomo**, pero no lobo solitario. **Resolutivo**, pero no desprolijo. **Honesto**, pero no frío | Tus 3 finalistas del bloque G |
| Persona gramatical | Yo en los hechos, vos en la invitación | Respuesta I1 C |

**Palabras que nunca van:** apasionado, crack, ninja, rockstar, disruptivo, innovador, soluciones, pixel-perfect, artesanal, experto, el mejor.

**Reglas de voz:**
1. Hechos en primera persona, sin modestia ni superlativos.
2. Corto y técnico, como un titular.
3. Yo en los hechos, vos en la invitación.

Las siglas se escriben completas la primera vez que aparecen en cada página: *Backend for Frontend (BFF)*, *Large Language Models (LLMs)*. GraphQL y React Query no se expanden.

**Restricciones de publicación:**
- **Plataforma clínica:** sin el nombre del cliente ("un centro de terapias"), sin capturas con datos de pacientes y sin link al repo.
- **Harness:** sin capturas ni mocks del producto.
- **JPMorgan Chase:** no aparece en la web (sí en el CV, que se manda a alguien en particular).
- **LaunchDarkly:** se nombra como el competidor cuya brecha se achicó, igual que en el CV.

---

## 2. Mapa del sitio

> **Actualizado el 2026-11-21** con la navegación nueva. Ver también [`fase4/direccion-de-diseno.md`](../fase4/direccion-de-diseno.md).

```
/                              → redirige a /es o /en según Accept-Language
├── /es                        Inicio
│   ├── /es/proceso            Proceso (cómo trabajo)
│   ├── /es/proyectos          Experiencia + Proyectos
│   │   └── /es/proyectos/{slug}   freelance · harness · split-io · mangoodev · plataforma-clinica
│   ├── /es/casos              Casos de estudio
│   │   └── /es/casos/{slug}       configs-ai-configs · pantalla-de-entrada
│   ├── /es/now                Ahora
│   ├── /es/uses               Uses
│   └── /es/colofon            Colofón (cómo está hecha esta web)
├── /en                        Home (mismas rutas: process, projects, case-studies, now, uses, colophon)
├── /cv-en.pdf                 CV (por ahora solo en inglés; /es también linkea a este)
└── 404                        una por idioma
```

- **Proyecto vs. caso de estudio.** El detalle de un proyecto sirve para entender el proyecto: contexto, restricciones, stakeholders y valor. Un caso de estudio sirve para entender una decisión: por qué A en vez de B, qué salió bien y qué salió mal.
- **Proyectos en el MVP:** solo la plataforma clínica. El trabajo en Harness y Split.io entra como casos de estudio, y lo demás se suma más adelante.
- **Casos de estudio en el MVP:** Configs y AI Configs, y la pantalla de entrada. Hasta tener la versión larga, cada uno muestra su mini-caso (sección 4.3).
- **Harness y Split.io se muestran como dos trabajos** (decisión del 2026-11-21). La línea de Harness aclara la compra.
- **Sin repos fijados.** El repo de la plataforma clínica es código del cliente y no se linkea.

**Orden del inicio:**

| # | Sección | Para qué |
|---|---|---|
| 1 | Header | El nombre lleva al inicio. Proceso · Proyectos · Casos de estudio. ES · EN |
| 2 | Hero | Quién sos y qué hacés, en 5 segundos. Sin CTA |
| 3 | Trabajo destacado | Freelance, Harness y Split.io. Cada entrada lleva a su detalle. Tiene dos versiones de wireframe (V1 y V2) |
| 4 | Cierre | La invitación a LinkedIn |
| 5 | Footer | LinkedIn, GitHub y CV; Ahora, Uses y Colofón; fecha de actualización y la línea personal |

---

## 3. Links

| Dato | Valor |
|---|---|
| LinkedIn | https://www.linkedin.com/in/juan-ignacio-werkalec/ |
| GitHub | https://github.com/Destras |
| Dominio | juaniw.com |
| Ciudad | Rosario, Argentina |

---

## 4. Copy, sección por sección

### 4.1 Header y navegación
| Elemento | ES | EN |
|---|---|---|
| Nombre (lleva al inicio) | Juan Ignacio Werkalec | Juan Ignacio Werkalec |
| Link a proceso | Proceso | Process |
| Link a proyectos | Proyectos | Projects |
| Link a casos | Casos de estudio | Case studies |
| Selector de idioma | ES · EN | ES · EN |

Ahora, Uses, CV y GitHub salieron del header y quedan en el footer (4.6). El rol (Senior Full-Stack Engineer) sigue en el `<title>` y en la imagen para redes; ya no va en el header. En mobile, el header va en dos filas hasta que se rediseñe el menú.

### 4.2 Hero
> **ES:** Me gusta crear cosas. Tomo features ambiguas con mínimo hand holding y cuido los detalles que separan lo bueno de lo excelente.
> **EN:** I like building things. I own ambiguous features end to end with minimal hand-holding, and I sweat the details that separate good from great.

Sin CTA: la frase va sola (decisión del 2026-11-21).

### 4.3 Mini-casos (ahora en las páginas de detalle)

Ya no están en el inicio. Cada mini-caso es el contenido provisorio de su página hasta que se escriba la versión larga:

| Mini-caso | Página |
|---|---|
| 1. Configs y AI Configs | `/casos/configs-ai-configs` |
| 2. Plataforma de seguimiento clínico | `/proyectos/plataforma-clinica`. Ojo: la plantilla de proyecto pide Contexto, Restricciones, Stakeholders y Valor, no Problema → Decisión → Resultado. Se reescribe en la ronda de copy |
| 3. La pantalla de entrada | `/casos/pantalla-de-entrada` |

**Línea de apertura** (ya no abre una sección del inicio; se puede usar en el detalle de Harness):
> **ES:** En Harness fui el único ingeniero de UI y Backend for Frontend (BFF) de Configs, Change proposals, Promote y AI Configs.
> **EN:** At Harness, I was the sole UI and Backend for Frontend (BFF) engineer on Configs, Change proposals, Promote and AI Configs.

**Formato de cada mini-caso:** título · ficha técnica · Problema → Decisión → Resultado. Máximo 25 palabras por línea.

---

#### Mini-caso 1: Configs y AI Configs · Harness

| Rol | Duración | Stack | Estado |
|---|---|---|---|
| Único ingeniero de UI y BFF | Configs: mar–may 2026 · AI Configs: ~2 meses | React, TypeScript, GraphQL (BFF en Node.js) | Configs: beta abierta · AI Configs: en producción |

> **ES**
> **Problema:** los clientes no podían cambiar la configuración de sus agentes de IA (system prompt, temperature) en tiempo real sin hacer un nuevo deploy.
> **Decisión:** sin spec ni mocks, saqué un alpha en la UI vieja en vez de esperar la nueva, que no tenía fecha: primero el feedback.
> **Lo que cambiaría:** fue un error. Después apareció tooling para usar la UI nueva dentro de la vieja, y tuve que rehacerla en la migración al monorepo.
> **Resultado:** Configs llegó a beta abierta. AI Configs, la versión para LLMs, llegó a producción en ~2 meses y achicó la brecha con LaunchDarkly.

> **EN**
> **Problem:** customers couldn't change their AI agents' configuration (system prompt, temperature) in real time without a new deploy.
> **Decision:** with no spec or mocks, I shipped an alpha on the legacy UI instead of waiting for the new one, which had no date. Feedback first.
> **What I'd change:** it was the wrong call. Tooling to run the new UI inside the old one showed up later, and I had to rebuild it during the monorepo migration.
> **Result:** Configs reached open beta. AI Configs, the LLM-specific version, shipped to production in ~2 months and narrowed the gap with LaunchDarkly.

> **Nota para diseño:** este mini-caso tiene una línea más que los otros ("Lo que cambiaría"). Es a propósito: es la prueba de "honesto, pero no frío". La tarjeta tiene que poder alojar 4 líneas.

---

#### Mini-caso 2: Plataforma de seguimiento clínico · Freelance

| Rol | Duración | Stack | Estado |
|---|---|---|---|
| Full-Stack Engineer y Technical Lead; lideré a 1 dev | Beta a los ~3 meses, producción a los ~6 | Next.js, TypeScript, Supabase, Expo / React Native | En producción y en Google Play |

> **ES**
> **Problema:** un centro de terapias con 12 terapeutas seguía a sus 150 pacientes en planillas; entre sesiones, el paciente quedaba solo.
> **Decisión:** elegí Supabase como backend compartido para web y mobile, en vez de uno propio, para entregar en 3 meses siendo dos.
> **Resultado:** en producción a los ~6 meses. Antes de lanzar, audité la seguridad y cerré una escalada de privilegios y 6 bloqueantes críticos.

> **EN**
> **Problem:** a therapy center with 12 therapists tracked its 150 patients in spreadsheets; between sessions, patients were on their own.
> **Decision:** I chose Supabase as a shared backend for web and mobile, instead of building our own, to ship in 3 months with two developers.
> **Result:** in production after ~6 months. Before launch, I audited security and closed a privilege escalation and 6 critical blockers.

---

#### Mini-caso 3: La pantalla de entrada · Split.io

| Rol | Contexto | Stack | Estado |
|---|---|---|---|
| Senior Frontend Engineer | Split.io, antes de la compra de Harness | React, React Query, GraphQL (BFF) | En producción |

> **ES**
> **Problema:** la pantalla de entrada del módulo, por donde pasaba todo usuario, tardaba de 3 a 6 s en cargar y lo dejaba bloqueado.
> **Decisión:** como era la puerta de entrada, rediseñé su capa de datos: rehice las queries del BFF, sumé caché con React Query y paralelicé los requests.
> **Resultado:** la carga bajó de 3–6 s a ~1 s, medida desde el request hasta tener los datos listos para renderizar.

> **EN**
> **Problem:** the module's landing screen, where every user entered, took 3 to 6 s to load and left them stuck.
> **Decision:** since it was the front door, I redesigned its data layer: reworked the BFF queries, added React Query caching and parallelized requests.
> **Result:** load time dropped from 3–6 s to ~1 s, measured from request to render-ready data.

### 4.4 Trabajo destacado (inicio) y Experiencia (/proyectos)
Formato: **empresa · rol · período**, y una línea de máximo 15 palabras. Harness y Split.io van como **dos trabajos** (decisión del 2026-11-21); la línea de Harness aclara la compra.

El **inicio** muestra Freelance, Harness y Split.io, en ese orden. **/proyectos** suma MangooDev. Cada entrada lleva a `/proyectos/{slug}`.

**Freelance · Full-Stack Engineer y Technical Lead · abr 2026 – actualidad** (`freelance`)
| | ES | EN |
|---|---|---|
| Línea (V1) | Plataforma de seguimiento clínico: web para terapeutas y app para pacientes, en producción. | Clinical follow-up platform: web console for therapists and a patient app, in production. |
| Descripción corta (V2) | Plataforma clínica: web y app, en producción. | Clinical platform: web and app, in production. |
| Links (V1) | Proyecto: Plataforma de seguimiento clínico → | Project: Clinical follow-up platform → |

**Harness · Senior Frontend Engineer · jun 2024 – oct 2026** (`harness`)
| | ES | EN |
|---|---|---|
| Línea (V1) | Harness compró Split.io en 2024. Único ingeniero de UI y BFF: Configs, AI Configs, Promote, migración al monorepo. | Harness acquired Split.io in 2024. Sole UI and BFF engineer: Configs, AI Configs, Promote, monorepo migration. |
| Descripción corta (V2) | Único ingeniero de UI y BFF, tras la compra de Split.io. | Sole UI and BFF engineer, after the Split.io acquisition. |
| Links (V1) | Caso: Configs y AI Configs → | Case study: Configs and AI Configs → |

**Split.io · Senior Frontend Engineer · ene 2022 – jun 2024** (`split-io`)
| | ES | EN |
|---|---|---|
| Línea (V1) | Carga de la pantalla de entrada: de 3–6 s a ~1 s. ~20 componentes compartidos. | Landing screen load: from 3–6 s to ~1 s. ~20 shared components. |
| Descripción corta (V2) | Pantalla de entrada: de 3–6 s a ~1 s. | Landing screen: from 3–6 s to ~1 s. |
| Links (V1) | Caso: La pantalla de entrada → | Case study: The landing screen → |

**MangooDev SRL · Full-Stack Developer · dic 2020 – ene 2022** (`mangoodev`, solo en /proyectos)
| | ES | EN |
|---|---|---|
| Línea | Sistema de compliance de proveedores para una farmacéutica multinacional. Creé el design system del equipo. | Supplier compliance system for a multinational pharma company. Built the team's design system. |
| Descripción corta | Compliance de proveedores y design system del equipo. | Supplier compliance and the team's design system. |

> **Orden:** el freelance va primero, porque sigue activo.
> **Fechas en EN:** "Apr 2026 – Present", "Jun 2024 – Oct 2026", "Jan 2022 – Jun 2024", "Dec 2020 – Jan 2022".
> **Descripciones cortas (V2):** son propuestas nuevas, del 2026-11-21. Se revisan en la ronda de copy.

### 4.5 Cierre
> **ES:** Si querés seguir la conversación, estoy en [LinkedIn](https://www.linkedin.com/in/juan-ignacio-werkalec/).
> **EN:** Want to keep talking? I'm on [LinkedIn](https://www.linkedin.com/in/juan-ignacio-werkalec/).

El link va sobre la palabra "LinkedIn". No va un botón.

### 4.6 Footer
| Elemento | ES | EN |
|---|---|---|
| Links externos | LinkedIn · GitHub · CV | LinkedIn · GitHub · Résumé |
| Rutas secundarias | Ahora · Uses · Colofón | Now · Uses · Colophon |
| Texto accesible de GitHub | GitHub (se abre en otra pestaña) | GitHub (opens in a new tab) |
| Fecha | Actualizado en {mes} {año} | Updated {month} {year} |
| Línea personal | Desde Rosario con amor. | From Rosario, with love. |

### 4.7 /now

> **ES**
> *Actualizado el 20 de noviembre de 2026. Inspirado en [nownownow.com](https://nownownow.com).*
> - **Trabajando en:** la plataforma de seguimiento clínico, acompañando la migración de los 150 pacientes.
> - **Construyendo:** esta web, en público.
> - **Escribiendo:** el caso completo de Configs y AI Configs.

> **EN**
> *Updated November 20, 2026. Inspired by [nownownow.com](https://nownownow.com).*
> - **Working on:** the clinical follow-up platform, helping migrate its 150 patients.
> - **Building:** this site, in public.
> - **Writing:** the full Configs and AI Configs case study.

Sin "buscando trabajo" ni "abierto a oportunidades": la web muestra trabajo, no lo pide. "Leyendo" y "Fuera de la pantalla" se suman cuando tengas algo real.

### 4.8 /uses

**Bajada (y meta description):**
> **ES:** Uso IA todos los días. La IA acelera; el criterio sigue siendo mío.
> **EN:** I use AI every day. It speeds me up; the judgment is still mine.

| Campo | ES | EN |
|---|---|---|
| Título (h1) | Uses | Uses |
| Meta title | Uses · Juan Ignacio Werkalec | Uses · Juan Ignacio Werkalec |
| Caption de la tabla (oculto) | Herramientas que uso | Tools I use |
| Encabezados | Categoría · Ítem · Comentario | Category · Item · Note |

En EN, la categoría "IA" es "AI" y la "y" de los ítems es "and": "Claude Code and Claude Desktop", "Superpowers and mattpocock-skills" (2026-11-24). La categoría "IA" se repite en las dos filas.

| Categoría | Ítem | ES | EN |
|---|---|---|---|
| Editor | VS Code | Lo de siempre: rápido, extensible, sin sorpresas. | The usual: fast, extensible, no surprises. |
| Terminal | iTerm2 + Oh My Zsh | Atajos y autocompletado para no escribir dos veces lo mismo. | Shortcuts and autocomplete, so I never type things twice. |
| IA | Claude Code y Claude Desktop | Specs primero, tests después; el agente escribe, yo reviso. | Specs first, then tests; the agent writes, I review. |
| IA | Superpowers y mattpocock-skills | Skills de agentes para planificar, testear y revisar. | Agent skills to plan, test and review. |
| Hardware | MacBook Pro 2021, M1, 64 GB | Todo abierto a la vez, sin cerrar nada. | Everything open at once, nothing to close. |
| Apps | Obsidian | Mi vault: lo que aprendo y decido queda escrito. | My vault: what I learn and decide gets written down. |

### 4.9 Microcopy y metadatos
| Elemento | ES | EN |
|---|---|---|
| `<title>` del inicio | Juan Ignacio Werkalec · Senior Full-Stack Engineer | Juan Ignacio Werkalec · Senior Full-Stack Engineer |
| Meta descripción (máx. 155 caracteres) | Fullstack senior, foco en UI. Me dan lo ambiguo; lo entrego en producción. | Senior full-stack engineer, UI-focused. Give me the ambiguous stuff; I'll ship it. |
| Imagen para redes (OG) | Nombre + rol + "Me gusta crear cosas.", solo texto (sin foto) | Name + role + "I like building things.", text only |
| 404: título | Esta página no existe. | This page doesn't exist. |
| 404: link | Volver al inicio → | Back home → |
| Aviso de idioma (opcional) | This page is also available in English. | Esta página también está en español. |

El aviso de idioma se escribe **en el otro idioma**: lo necesita justamente quien no lee el idioma de la página.

### 4.10 Páginas nuevas (sin copy todavía)
Se agregaron el 2026-11-21. Los wireframes las muestran con la estructura y el largo estimado; el copy sale de una ronda aparte.

| Página | Estructura | Fuente del copy |
|---|---|---|
| /proceso | Texto corrido con subtítulos cortos: cómo trabajo, en palabras reales | Ronda de copy (las reglas de /uses y los mini-casos dan pistas: "specs primero, tests después", "primero el feedback") |
| /proyectos | Experiencia (4 filas, sección 4.4) + Proyectos (1 fila: la plataforma clínica) | Este documento |
| /proyectos/{slug} | Título · tabla (Rol / Duración / Stack / Estado / Stakeholders) · Contexto · Restricciones · Valor · visual opcional. Las experiencias cierran con links a sus proyectos y casos | `datos.md` |
| /casos | Lista de 2 filas, con el mismo formato | Este documento |
| /casos/{slug} | Tabla · Problema · Opciones (A vs. B) · Decisión y por qué · Qué salió bien · Qué salió mal o qué cambiaría · Resultado | Mini-casos (4.3), ampliados después |
| /colofón | Tabla de Capa · Tecnología · Por qué | Borrador abajo (2026-11-24) |

#### /colofón — borrador (2026-11-24, pendiente de revisión del dueño)
Escrito por Claude a partir del repo. Ya está en `src/i18n/es.ts` y `en.ts`; si se corrige, se corrige acá y allá.

| Campo | ES | EN |
|---|---|---|
| Título (h1) | Colofón | Colophon |
| Meta title | Colofón · Juan Ignacio Werkalec | Colophon · Juan Ignacio Werkalec |
| Bajada (y meta description) | Cómo está hecho este sitio, capa por capa, y por qué elegí cada pieza. | How this site is built, layer by layer, and why I picked each piece. |
| Caption de la tabla (oculto) | Cómo está hecho este sitio | How this site is built |
| Encabezados | Capa · Tecnología · Por qué | Layer · Technology · Why |

| Capa (ES / EN) | Tecnología (ES / EN) | Por qué ES | Por qué EN |
|---|---|---|---|
| Framework / Framework | Astro | Genera HTML estático y no manda JavaScript que la página no necesita. | It outputs static HTML and ships no JavaScript the page doesn't need. |
| Tipos / Types | TypeScript | Si falta una traducción, el chequeo falla antes de publicar. | If a translation is missing, the check fails before anything ships. |
| Idiomas / Languages | i18n de Astro / Astro i18n | Un solo archivo por página y un mapa de rutas para ES y EN. | One file per page and one route map for ES and EN. |
| Estilos / Styles | CSS con tokens / CSS with tokens | Sin frameworks: cada color y cada medida sale de un token, con dos temas y modo noche. | No framework: every color and every size comes from a token, with two themes and a dark mode. |
| Tipografía / Typography | Atkinson Hyperlegible Next y Commit Mono / … and Commit Mono | Una para leer cómodo y otra como acento técnico. Las dos se sirven desde este sitio. | One for easy reading and one as a technical accent. Both are served from this site. |
| Diseño / Design | Claude Design | Los wireframes y la primera versión visual. Las decisiones finales las tomé yo. | The wireframes and the first visual pass. The final calls were mine. |
| Implementación / Build | Claude Code | Escribe el código desde specs y planes; yo decido y reviso cada sección. | It writes the code from specs and plans; I decide and review every section. |
| Deploy / Deploy | Netlify | Lo recomienda Astro: un sitio estático sale sin configuración extra. | Astro recommends it: a static site ships with no extra setup. |

| Cierre | ES | EN |
|---|---|---|
| Styleguide (link en "guía de estilos" / "styleguide") | ¿Cómo se ve cada pieza? Está en la guía de estilos. | Want to see each piece? It's in the styleguide. |
| Código (link en "GitHub", otra pestaña) | El código está en GitHub. | The code is on GitHub. |

---

## 5. Adaptación al inglés

Reglas que se aplicaron:
- Los datos son idénticos en los dos idiomas: números, fechas, nombres y stack.
- Fechas: "ene 2022" en ES y "Jan 2022" en EN; "actualidad" es "Present".
- "Hand holding" → *hand-holding* (con guion, como se escribe en inglés).
- La calidez en EN sale de las frases cortas y las contracciones (*I'm*, *couldn't*, *I'd*).

---

## 6. Tests

| Test | Estado |
|---|---|
| **Humo** | Pasa. Cada afirmación sale del CV o de `datos.md`. Lo que no tenía respaldo (TUIA, marketplace de cartas, "0 bugs", objetivo de 2.000 pacientes) quedó afuera |
| **Venta** | Pasa. El único "vos" está en el cierre |
| **Palabras prohibidas** | Pasa en el copy. El comando de `pasos.md` solo marca la lista de la sección 1 |
| **Escaneo** | Pendiente: leé solo los títulos y la primera línea de cada sección |
| **Voz alta** | Pendiente: leé el hero y los mini-casos en voz alta |
| **Recorte** | Hecho en la redacción; todas las líneas respetan los límites de palabras |

---

## 7. Pendientes

**Para cerrar la Fase 3:**
- [ ] Leer el hero y los mini-casos en voz alta (test de voz alta).
- [ ] Pasar el inglés por una revisión con este prompt: *"Revisá que suene natural para un engineering manager de EE. UU. No cambies los datos ni agregues adjetivos."*
- [x] Probar el copy contra la "Dirección de diseño" de la Fase 4 (hecho el 2026-11-21, ver el anexo de `fase4/direccion-de-diseno.md`).
- [ ] Ronda de copy para las páginas nuevas (4.10): /proceso, los 5 detalles de /proyectos y las versiones largas de los 2 casos.

**Activos (paso 8), fuera de la web:**
- [ ] **CV:** cambiar el freelance a "Apr 2026 – Present" y separar Split.io y Harness en las dos entradas de la sección 4.4, con las mismas fechas que la web. Exportar `cv-en.pdf` (por ahora no hay versión en español).
- [ ] **GitHub:** ponerle descripción y README a `nextjs-supabase-sample` o hacerlo privado; archivar el fork `react-hooks-testing-complete` (2021).
- [ ] **LinkedIn:** juaniw.com en la sección de contacto. El titular ya coincide con el rol.
- [ ] **Carpeta `assets/`** con los CVs. Más adelante: favicon e imagen para redes.

**Mejoras para después del lanzamiento:**
- Mini-caso 3: la Decisión tiene el *porqué*, pero no una alternativa descartada. Si te acordás de qué otra opción había, la línea mejora.
- /now: sumar "Leyendo" y "Fuera de la pantalla".
- Si conseguís la evidencia de "0 bugs reportados" en Configs o AI Configs, va al final del Resultado del mini-caso 1.
