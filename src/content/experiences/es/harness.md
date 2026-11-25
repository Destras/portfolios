## Contexto

Harness compró Split.io en 2024. Desde entonces fui el único ingeniero de UI y Backend for Frontend (BFF) de Configs, Change proposals, Promote y AI Configs, en una plataforma con 500+ clientes pagos.

- **Configs** (mar–may 2026): configuración en vivo de agentes de IA. Los clientes definen variantes (system prompt, temperature) y las cambian en tiempo real, sin redeploy. Diseñé la UX sin mocks ni specs detalladas. Llegó a beta abierta.
- **AI Configs** (~2 meses, jul–ago 2026): la versión para Large Language Models (LLMs). Desde el Software Development Kit (SDK), los clientes controlan en runtime el proveedor, el modelo y los parámetros de cada variante. Está en producción y achicó la brecha con LaunchDarkly.
- **Change proposals y Promote:** generé el objeto cambiado y el JSON patch en el BFF, que es la fuente de verdad. Promote pasa una definition de un environment a otro en 2 clicks, con approvers y trazabilidad.
- **Migración al monorepo de UI:** 13 módulos, cero regresiones y E2E en los flujos críticos.
