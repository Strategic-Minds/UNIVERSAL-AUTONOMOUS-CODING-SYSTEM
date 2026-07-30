# Xtreme AI National Construction OS Build Program

## Mission
Build an evidence-backed national construction intelligence and operating system that discovers public and authorized projects, preserves source provenance, resolves duplicate projects, identifies flooring scope and project parties, tracks awards, and feeds the existing Xtreme AI bidding and operations workflow.

## Non-negotiable architecture
1. Base44 is the operator control plane.
2. Browser Worker is the deterministic browser execution plane.
3. Official APIs and machine-readable feeds are preferred over browser automation.
4. Every material fact must retain field-level source lineage.
5. The autonomous coding factory works through branches, focused packets, tests, receipts, draft PRs, and rollback plans.
6. Production, secrets, migrations, external messages, destructive actions, and financial actions remain approval-gated.

## Execution order

### WP-01 National Jurisdiction Registry
- Import current Census Gazetteer states, counties, county subdivisions, places, and school districts.
- Preserve GEOID, FIPS, parent relationships, names, internal coordinates, source year, and source URL.
- Make imports idempotent and versioned.
- Do not execute production migrations in this packet.

### WP-02 Source Registry Factory
- Create source records by jurisdiction and source family.
- Classify access, policy, cadence, adapter type, document probability, bidder probability, award probability, and health.
- Activate only sources that are official, public, authorized, first-party, or licensed.
- Route blocked sources to human verification.

### WP-03 Adapter SDK
Implement a common contract for:
- SAM.gov
- USAspending
- ArcGIS
- Socrata
- CKAN
- Legistar
- RSS/XML/JSON/CSV/Excel/ICS
- Static HTML and public PDF indexes
- Email and manual submission
- Browser Worker

Every adapter must support discovery, detail retrieval, documents, updates, normalization, health checks, rate limits, idempotency, provenance, and receipts.

### WP-04 Production Browser Worker
- Queue-driven jobs
- Strict policy profiles
- Per-source sessions
- Rate and runtime limits
- Screenshots, traces, downloaded-file hashes, and network evidence
- Retry budgets and dead-letter queue
- No CAPTCHA bypass, access-control circumvention, protected membership scraping, or stealth proxy evasion

### WP-05 Florida Proof
Prove one complete loop using official Florida sources:
- Florida DMS / MFMP / VIP
- FDOT lettings
- FDOT plan and proposal holders
- Mandatory pre-bid attendance
- Addenda and supplements
- Bid tabulations and intent-to-award records

Required proof:
1. Discover source record.
2. Collect listing and detail.
3. Preserve immutable raw evidence.
4. Normalize project.
5. Resolve project identity.
6. Attach documents and updates.
7. Create bidder evidence.
8. Track award.
9. Produce source, parser, and data-integrity receipts.

### WP-06 State Wave Generator
- Generate candidate registries for all states.
- Validate source families in controlled waves.
- Do not mark a state complete until its required source matrix and golden tests pass.

## Validation mesh
Each packet must produce:
- Build receipt
- File manifest
- Lint and typecheck results
- Unit and contract results
- Integration results
- Security results
- Provenance and data-integrity results
- E2E evidence where applicable
- Rollback instructions

## Definition of done
A packet is done only when its expected behavior is reproducible from a clean checkout and every claim in the receipt points to code, test output, a source artifact, or a generated evidence record.
