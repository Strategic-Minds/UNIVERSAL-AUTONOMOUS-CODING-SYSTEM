# TEMPLATE: SaaS Dashboard
## Type: Enterprise SaaS Application
## Use Case: Any B2B dashboard (estimating, CRM, management tools)

### Shell
- Black sidebar (240px, fixed)
- White topbar (64px, fixed)
- Light gray content (#f0f0f0)
- Gold CTAs (#f8b800)
- Inter font

### Standard Routes
- `/dashboard` — Overview KPIs + activity
- `/[entity]` — List view with table + filters
- `/[entity]/new` — Creation form
- `/[entity]/[id]` — Detail view
- `/settings` — Configuration
- `/settings/pricing` — Pricing tables

### Required Components
- Sidebar (black, gold active state, hazard stripe)
- TopBar (breadcrumb, search, notifications, user)
- StatTile grid (4 KPIs)
- DataTable (sort, filter, pagination)
- DetailCard (entity overview)
- FormModal (create/edit)
- EmptyState
- LoadingSkeleton
