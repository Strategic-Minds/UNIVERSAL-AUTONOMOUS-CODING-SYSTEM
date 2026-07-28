# UACS Unified Synchronization Control Plane

**Status:** DISCOVERY / BRANCH-SAFE DRAFT  
**Control ID:** `UACS-SYNC-20260727`  
**Owner:** Jeremy Bensen  
**Primary business identity:** `jeremy@strategicmindsai.com`

## Mission

Create one governed synchronization fabric for UACS and BID FAST across Google Drive, GitHub, Base44, Supabase, Vercel, Gmail, Google Calendar, Google Contacts, Slack, and the ChatGPT Business workspace.

This document is a control contract, not proof that every connector is currently bidirectionally synchronized.

## Canonical authority map

| Authority | Canonical system |
|---|---|
| Operator decisions | Jeremy Bensen through the current approved instruction or approval record |
| Corporate business source truth | XTREME-AI-SYSTEMS Google Drive folder `11X5JejU_8EYEMYOh0yLCgBlyVw4EGh_B` |
| UACS technical source truth | `Strategic-Minds/UNIVERSAL-AUTONOMOUS-CODING-SYSTEM` |
| Orchestration and durable registries | Base44 app `6a4ae522852a5e08bfa42450` |
| Runtime and deployment evidence | Vercel project `prj_sYbLbZnrmj6HehnU1uquwgMyu0dz` |
| Intended UACS database | Supabase project ref `prhppuuwcnmfdhwsagug`, pending authenticated connector verification |
| Communications and incident surface | Slack control channel, pending creation and Base44 OAuth |
| ChatGPT Business | Operator interface and connector client, never the sole durable database |

## Identity map

- Primary corporate identity: `jeremy@strategicmindsai.com`
- GitHub/Vercel operating identity: `xps-admin` / `strategicmindsadvisory@gmail.com`
- Main operating-business identity: `jeremy@nationalconcretepolishing.net`
- Base44 Gmail currently connected to `leads@nationalepoxypros.com`; do not replace it without a separate approval because replacement could interrupt an existing lead workflow.
- The current ChatGPT Google Drive connector may authenticate through a different shared account. Access does not equal ownership or canonical authority.

## Synchronization lanes

1. **Drive to GitHub:** approved specifications, schemas, policies, and work packets only.
2. **GitHub to Drive:** commits, pull requests, release notes, manifests, validation evidence, and receipts.
3. **GitHub to Vercel:** preview deployment by default. Production is approval-gated.
4. **Vercel to Drive/Base44:** deployment IDs, URLs, build state, runtime errors, smoke-test evidence, and rollback references.
5. **Base44 to GitHub:** governed work packets and branch requests, never direct protected-branch mutation.
6. **Base44 and Supabase:** idempotent state synchronization with stable IDs, timestamps, source hashes, and append-only receipts.
7. **Slack:** internal alerts, approval requests, blocked-state notices, and completion receipts. Slack is not the source of truth.
8. **Gmail:** read, classify, and draft by default. Sending or modifying business mail requires explicit workflow authority.
9. **Calendar:** approved deadlines, reviews, and release gates only.
10. **Contacts:** lookup and identity resolution under the currently connected read-only capability.

## Conflict resolution

Resolve conflicts in this order:

1. Current explicit operator decision
2. Approved source-truth document or workbook
3. Runtime evidence and validation receipts
4. Base44 registry record with evidence and timestamp
5. GitHub commit or pull request
6. Google Drive artifact
7. Slack, email, or calendar notification
8. Inference

Every synchronized record must include `source_system`, `source_id`, `source_updated_at`, `sync_version`, `content_hash`, `last_synced_at`, and `sync_status`.

## Persistent heartbeat specification

Target cadence: every five minutes through a Vercel Workflow or Cron heartbeat.

Each heartbeat must:

1. Inspect queued synchronization jobs.
2. Compare stable IDs, timestamps, and content hashes.
3. Refuse ambiguous, destructive, secret-bearing, or protected actions.
4. Write a receipt for every attempted action.
5. Retry transient failures with bounded backoff.
6. Move exhausted failures to a dead-letter queue.
7. Notify Slack only for approvals, failures, security issues, or meaningful completions.

A five-minute heartbeat is a specification until a deployed workflow, execution log, and receipt prove it is active.

## Protected actions

The following always require a scoped operator approval:

- Production deployment or protected-branch merge
- Secret creation, replacement, or disclosure
- Database migration or destructive data operation
- New paid resource, billing action, or subscription
- Public publishing, customer email, customer SMS, or external Slack message
- Domain or DNS change
- Repository visibility change or deletion
- OAuth account replacement when it could disconnect an existing workflow

## Immediate safety overrides

- `production_auto_ship = false`
- `default_deployment_target = preview`
- `outbound_customer_messages = false`
- `database_migrations = approval_required`
- `secrets_in_source_control = prohibited`
- `conflict_policy = quarantine_and_request_decision`

## Acceptance gates for real bidirectional synchronization

The system may be labeled `ACTIVE_BIDIRECTIONAL` only when all of the following are verified:

- Every target connector is authenticated to the intended account.
- The UACS Supabase project is visible to the authenticated connector.
- Slack is connected to Base44 and a control channel exists.
- The five-minute workflow has an execution ID and successful test receipt.
- Round-trip tests pass for each enabled lane.
- Idempotency and conflict tests pass.
- Rollback is documented and tested.
- No public-write Drive folders or unintended public repositories remain.

Until then, status is `PARTIAL_SYNC / GOVERNED_BOOTSTRAP`.
