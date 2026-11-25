## Contexto

Trabajé en el frontend de feature flags de Split.io, una plataforma con 500+ clientes, antes de que Harness la comprara en 2024.

- **Pantalla de entrada:** todo usuario del módulo pasaba por ella, y tardaba de 3 a 6 s en cargar. Rediseñé su capa de datos: rehice las queries del Backend for Frontend (BFF), sumé caché con React Query y paralelicé los requests. Bajó a ~1 s.
- **Componentes compartidos:** ~20 componentes, documentados en Storybook y adoptados por 3 equipos.
- **Segmentación avanzada para enterprise:** TBD.
