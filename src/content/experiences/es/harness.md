## Contexto

Harness compró Split en 2024. Construí features end to end a partir de requerimientos mínimos de producto, en la UI y en un microservicio GraphQL (BFF). Me promovieron a Senior en marzo de 2025.

## Proyectos destacados

### Configs y AI Configs: configuración en vivo de agentes de IA
Fui el único dev de UI y BFF en las features que ayudaron a cerrar la brecha con LaunchDarkly, competidor directo.
- **Diseñé** la UX sin mocks ni specs detalladas, y la arquitectura de datos del BFF antes de que existiera el contrato con backend.
- **AI Configs:** formulario por variante con proveedor, modelo y parámetros del LLM, integrado con el módulo de modelos y prompts de la empresa.
- **Beta abierta** con 0 bugs reportados en 4 semanas y 100% de cobertura unitaria y de flujos de usuario con e2e.

### Change proposals y Promote environment
Hice que copiar configuración entre environments, que era manual, pasara a tomar 2 clics y quedara registrado.
- **Diseñé** un flujo en el que el BFF genera el JSON patch y la UI solo muestra el diff.
- **Un único dominio genérico** para cualquier entidad, con optimistic locking.
- **En producción sin bugs reportados.** Hoy es la única forma de modificar Configs.

### Archivado de feature flags para JPMorgan Chase
JPMorgan Chase, uno de nuestros clientes más importantes, necesitaba archivar feature flags sin perder el historial que requiere para auditoría, y tenía un deadline. Lideré la UI y lo entregué antes de esa fecha, así que el cliente pudo seguir adelante.
- **Historial intacto:** extendí los audit logs para que también traigan las definitions viejas y archivadas, no solo la última.
- **Archivado seguro:** avisos de acción destructiva cuando una flag se usa en otro lado, y permisos con RBAC.
- **Se lanzó para todos los clientes.**

