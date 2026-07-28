# 🚀 UACS — Universal Autonomous Coding System

> **Drop an idea. Wake up to a live, FAANG-quality application.**

[![Strategic Minds](https://img.shields.io/badge/Strategic%20Minds-APEX-gold)](https://strategicminds.ai)
[![FAANG Standard](https://img.shields.io/badge/Quality-FAANG%20Standard-black)](https://github.com/Strategic-Minds/UNIVERSAL-AUTONOMOUS-CODING-SYSTEM)
[![Template Repo](https://img.shields.io/badge/Template-Ready-green)](https://github.com/Strategic-Minds/UNIVERSAL-AUTONOMOUS-CODING-SYSTEM/generate)

---

## What It Is

UACS is a 3-agent autonomous software factory. You provide a minimal idea. The system delivers a production-deployed, tested application — automatically.

**You do 2 things:**
1. Submit an idea (30 seconds)
2. Approve 1 of 3 visual options (30 seconds)

**The system does everything else.**

---

## The 3-Agent Machine

| Agent | Platform | Owns |
|-------|----------|------|
| **APEX** | Base44 Superagent | Orchestration, spec, code, deploy, healing |
| **ChatGPT** | OpenAI + Bridge | Logo, brand, mockups, visual validation |
| **BrowserWorker** | Vercel Serverless | E2E tests, screenshots, PageSpeed, QA |

---

## 6-Phase Pipeline

```
IDEA → SPEC → BRAND (ChatGPT) → BUILD (APEX) → VALIDATE (BW+GPT) → DEPLOY
```

Visual approval gate between BRAND and BUILD — Jeremy picks 1 of 3 options.
FAANG gate (score ≥ 90/100) required before production deploy.

---

## FAANG Quality Gate (4-Pass)

| Pass | Checks | Points |
|------|--------|--------|
| 1 — Code Quality | TypeScript ✓ ESLint ✓ No todos ✓ | 0-25 |
| 2 — Visual Parity | ≥99% match vs approved mockup | 0-25 |
| 3 — Functional | All routes 200 ✓ Forms ✓ APIs ✓ | 0-25 |
| 4 — Performance | PageSpeed ≥85 A11y ≥95 SEO ≥95 | 0-25 |

**Score ≥ 90 → auto-ships to production.**
**Score 70-89 → APEX auto-heals → retests (max 3 iterations).**
**Score < 70 → rebuilt from scratch.**

---

## Using This Template

```bash
# 1. Create a new project from this template
# Click "Use this template" on GitHub → name your project

# 2. Clone your new repo
git clone https://github.com/Strategic-Minds/YOUR-PROJECT

# 3. Install dependencies
npm install --legacy-peer-deps

# 4. Copy env file
cp .env.example .env.local
# Fill in your Supabase URL + anon key

# 5. Run locally
npm run dev

# 6. Push to GitHub → Vercel auto-deploys via GitHub Actions
```

---

## Template Library

| Template | Type | Code Reuse |
|----------|------|-----------|
| `city-site` | Local service landing page | ~80% |
| `saas-dashboard` | Enterprise SaaS app | ~70% |
| `crm-dashboard` | Lead management system | ~65% |
| `landing-page` | Marketing/campaign page | ~75% |

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **Styling:** Custom UACS Design System (black sidebar, gold CTAs, Inter font)
- **Database:** Supabase (PostgreSQL + RLS)
- **Hosting:** Vercel
- **Testing:** Playwright + Jest + BrowserWorker
- **CI/CD:** GitHub Actions → Vercel

---

## Project #1: Xtreme Takeoff

The first project running through this pipeline. AI estimating and proposal platform for epoxy/polished concrete contractors.

**Status:** Phase 3 — BUILD in progress
**Preview:** https://xtreme-takeoffs-bkeg7bdd0-strategic-minds-advisory.vercel.app

---

*UACS v1.0 | Strategic Minds Advisory AI | Jeremy Bensen | 2026*
