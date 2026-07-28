# TEMPLATE: CRM Dashboard
## Type: Lead Management System
## Use Case: Sales pipeline, lead tracking, outreach management

### Routes
- `/crm` — Pipeline overview
- `/crm/leads` — Lead list
- `/crm/leads/[id]` — Lead detail + activity log
- `/crm/outreach` — Campaign management
- `/crm/analytics` — Conversion reports

### Integrations
- Base44 OutreachQueue entity
- Twilio SMS/WhatsApp (OUTBOUND_ENABLED=false default)
- HubSpot (HUBSPOT_API_KEY optional)

### Required ENV
```
OUTBOUND_ENABLED=false
REAL_OUTBOUND_APPROVED=false
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```
