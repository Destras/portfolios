## Contexto

Un centro de terapias con 12 terapeutas seguía a sus 150 pacientes en planillas. Entre sesiones, el paciente no tenía nada que lo acompañara.

Construí la plataforma como freelance: una consola web para terapeutas y una app para pacientes. Fui el único contacto con el cliente, hice el discovery y escribí las 18 specs.

Sumé y mentoreé a un dev con menos experiencia. Construí ~70% de la app de React Native (Expo) y la publiqué en Google Play.

## Restricciones

- Éramos dos y la beta tenía que salir en ~3 meses. Por eso elegí Supabase como backend compartido para web y mobile, en vez de uno propio.
- La revisión de las tiendas no podía frenar el lanzamiento. Desacoplé la web del mobile y lancé primero la consola web.
- El alcance cambiaba seguido. Trabajé con PRs chicos y encadenados para absorber los cambios sin reescribir.

## Valor

- Beta a los ~3 meses y producción a los ~6, en oct 2026. La app está publicada en Google Play.
- Antes de lanzar, audité la seguridad: cerré 6 bloqueantes críticos y una escalada de privilegios que le permitía a cualquier usuario logueado truncar 6 tablas.
- Corregí los permisos en la fuente del schema, en vez de filtrar los GRANT, para que el problema no volviera.
- Más de 200 tests automatizados. Hoy se están migrando los 150 pacientes desde las planillas.
