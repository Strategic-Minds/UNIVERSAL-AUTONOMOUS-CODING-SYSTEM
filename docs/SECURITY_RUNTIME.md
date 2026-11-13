# UACS security and execution contract (staging)

This branch repairs legacy UACS fail-open behavior. It is not a production release.

- A missing BRIDGE_SHARED_SECRET returns HTTP 503 for bridge/webhook mutations; an invalid bearer returns 401.
- A missing UACS_OPERATOR_TOKEN returns HTTP 503 for queue reads/writes; no operator token may be embedded in browser code.
- A registered QA score is not independent Guardian proof; QA callbacks record ship_it=false, faang_passed=false, status=validate.
- APEX is not a verified executor here. Unrouted jobs return 503 rather than pretending to be queued.
- Provider HTTP acceptance is only transport acceptance. It does not prove code changes, test results, deployment, or final delivery.
- Supabase writes must return a persisted record; unknown storage state cannot be represented as successful dispatch.
- The browser-facing idea submission path requires a proper authenticated server session before activation. Do not expose server tokens to the frontend.
- Legacy UACS is not the canonical Etherverse/X1 runtime. Reuse existing X1 orchestration, leases, receipts and Guardian before wiring a new dispatch adapter.
- No public release, paid action, outbound email/SMS/call, secret rotation, or database migration is authorized by this branch.
