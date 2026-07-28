# UACS Sandbox Control Plane

## Decision

All autonomous coding experiments must execute inside the isolated UACS sandbox before any promotion request reaches the canonical UACS repository.

## Registered resources

- Sandbox Drive: `1oCOk11T646vZqHfEmS1vnClXoVPG_3bU`
- Sandbox GitHub: `Strategic-Minds/UNIVERSAL-AUTONOMOUS-CODING-SYSTEM-SANDBOX`
- Sandbox Vercel: `prj_RE8lepQbj636rsHdJGO29KS0Pbao`
- Mandatory browser validator: `Strategic-Minds/BROWSERWORKER`
- Base44 registry app: `6a4ae522852a5e08bfa42450`

## Mandatory promotion gates

1. Approved immutable visual reference.
2. Preview deployment ID and URL.
3. BrowserWorker deep-health pass.
4. BrowserWorker screenshots for desktop, tablet, and mobile.
5. At least 99% visual parity at every breakpoint.
6. Exactly 100% operational parity for all applicable routes, navigation, forms, APIs, auth, responsive states, and PWA behavior.
7. Zero console errors and zero network errors.
8. Code, build, E2E, accessibility, and security receipts.
9. Verified rollback reference.
10. Draft pull request to canonical UACS.
11. Operator approval before production.

A score cannot override a failed mandatory gate. Missing BrowserWorker evidence blocks promotion.

## Direction of authority

Canonical UACS may refresh the sandbox. The sandbox cannot directly write to canonical main. Promotion is evidence-backed and draft-PR-only.
