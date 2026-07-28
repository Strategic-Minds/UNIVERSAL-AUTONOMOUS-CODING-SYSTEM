# UACS Governance — Permanent Law
## Version 1.0 | 2026-07-27 | Jeremy Bensen

---

## SYSTEM IDENTITY
UACS (Universal Autonomous Coding System) is the master software factory.
Jeremy inputs minimal ideas. The system ships FAANG-quality production apps.

## AGENTS & OWNERSHIP
| Agent | Platform | Owns | Bridge |
|-------|----------|------|--------|
| APEX | Base44 Superagent | Orchestration, spec, code, deploy | Native |
| ChatGPT | OpenAI GPT-4o | Logo, brand, mockups, visual validation | xtreme-ai-bridge.vercel.app |
| BrowserWorker | Vercel Serverless | E2E tests, screenshots, PageSpeed | /api/bridge?agent=browserworker |

## BIDIRECTIONAL BRIDGE PROTOCOL
- APEX → ChatGPT: POST /api/bridge {agent:"chatgpt", type:"brand_generation", payload:{spec}}
- ChatGPT → APEX: POST /api/webhook {event_type:"brand_complete", project_id, data:{brand_options}}
- APEX → BrowserWorker: POST /api/bridge {agent:"browserworker", type:"screenshot", payload:{steps}}
- BrowserWorker → APEX: POST /api/webhook {event_type:"qa_complete", project_id, qa_score, data}

## FAANG GATE (NON-NEGOTIABLE)
Score ≥ 90/100 required before any production deploy.
Pass 1 (Code): TypeScript + ESLint + no console.logs + no TODOs = 25pts
Pass 2 (Visual): 99% parity vs approved mockup on desktop, 95% mobile = 25pts
Pass 3 (Functional): All routes 200 + forms + APIs + auth = 25pts
Pass 4 (Performance): PageSpeed 85+ + A11y 95+ + SEO 95+ = 25pts

Auto-heal: Score 70-89 → APEX patches and retests (max 3 iterations)
Rebuild: Score <70 → APEX rebuilds from scratch

## QUEUE RULES
1. Max 3 P1 items active simultaneously
2. Visual approval (Phase: BRAND) always requires Jeremy confirmation
3. All phase transitions logged to uacs_build_log (Supabase)
4. Jeremy notified via WhatsApp on every phase change
5. Production deploys require FAANG gate pass — no exceptions

## DESIGN SYSTEM (ALL PROJECTS)
- Sidebar: #000000 black, 240px fixed
- Active state: #f8b800 gold left border + gold tint
- Page bg: #f0f0f0
- Cards: #ffffff
- Primary CTA: #f8b800 gold, black text
- Font: Inter
- Topbar: #ffffff, 64px

## SUPABASE TABLES (apply migration before use)
URL: https://supabase.com/dashboard/project/prhppuuwcnmfdhwsagug/editor
File: supabase/migrations/20260727000000_uacs_schema.sql
Tables: uacs_projects, uacs_queue, uacs_build_log, uacs_qa_results,
        uacs_brand_packages, uacs_templates, uacs_agent_status, uacs_notifications

## INFRASTRUCTURE
GitHub: https://github.com/Strategic-Minds/UNIVERSAL-AUTONOMOUS-CODING-SYSTEM
Vercel: https://universal-autonomous-coding-system-lbk9qstc4.vercel.app
Supabase: https://prhppuuwcnmfdhwsagug.supabase.co
Drive: https://drive.google.com/drive/folders/1sDhkd1r1wGn-V3tzRM-f0b4CsG-Kleys
