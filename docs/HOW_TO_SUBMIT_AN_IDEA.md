# How to Submit an Idea to UACS

## Option 1 — Via Dashboard (easiest)
1. Go to https://[UACS_URL]/pipeline/ideas
2. Fill in: Project Name + One sentence + Business goal
3. Hit "Submit to Queue"
4. Done. Wake up to results.

## Option 2 — Via WhatsApp
Text APEX: "New project: [Name] — [One sentence description] — Priority P1/P2/P3"
APEX adds it to the queue automatically.

## Option 3 — Via ChatGPT Bridge
Tell ChatGPT: "Submit this to the UACS queue: [description]"
ChatGPT calls the bridge API → idea lands in queue.

## What You DO:
✅ Submit the idea (30 seconds)
✅ Pick 1 of 3 brand/visual options ChatGPT generates (30 seconds)
✅ (Optional) Review before production deploy

## What APEX Does Automatically:
1. Generates full tech spec + DB schema + route map
2. Assigns to ChatGPT for logo + brand + mockups
3. Builds all screens in Next.js
4. Pushes to GitHub, deploys to Vercel preview
5. Runs BrowserWorker: screenshots all routes
6. Runs FAANG gate (4-pass QA)
7. Auto-fixes if score < 90, retests
8. Deploys to production when score ≥ 90
9. Sends you a WhatsApp with the live URL

## Idea Format (minimal)
```
Project Name: Phoenix Epoxy Pros — Dallas
Description: City landing page for epoxy flooring in Dallas TX
Business Goal: Revenue (lead gen)
Template: city-site
Priority: P2
```
