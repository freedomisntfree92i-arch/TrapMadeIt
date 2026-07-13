# TRAP MADE IT - Phase 1 + Phase 2 Foundation

This repository now contains a modular, buildable version of the prototype plus a non-breaking Phase 2 admin/data scaffold.

## What Phase 1 delivered

- Migrated from a single monolithic HTML runtime to a proper app structure.
- Preserved the current visual identity and gameplay loop.
- Added a modern dev/build toolchain for reliable local development and deployment.

## Project structure

- `index.html`: App shell and game UI markup.
- `admin.html`: Back-office scaffold page for chapter/drop editing.
- `src/styles.css`: All visual styling (loader, HUD, panels, rooms UI).
- `src/game.js`: Core game runtime (levels, missions, interactions, product viewer).
- `src/main.js`: App entrypoint that wires styles + runtime.
- `src/data/defaultContent.js`: Default chapter/drop/mission dataset.
- `src/data/contracts.js`: Content validation rules.
- `src/data/contentStore.js`: Local storage content store + import/export.
- `src/admin.js`: Admin page logic.
- `src/admin.css`: Admin page styles.
- `docs/PHASE2-FOUNDATION.md`: Notes on what was scaffolded and next integration steps.
- `TRAP-MADE-IT-game.html`: Original single-file prototype kept for reference.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start local dev server:

```bash
npm run dev
```

Optional: run front-end + mock API together:

```bash
npm run dev:full
```

Mock API only:

```bash
npm run dev:api
```

3. Build production assets:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

5. Open the admin scaffold while dev server is running:

```text
http://localhost:5173/admin.html
```

6. Mock API health check:

```text
http://localhost:8787/api/health
```

## Why this matters

- Your team can now iterate safely without editing one giant file.
- CI/CD and hosting workflows are now straightforward.
- Phase 2 groundwork is now in place so product managers can manage content structure without editing core gameplay files.

## Notes

- Current build warning about bundle size is expected at this stage because the game runtime is still large and bundled together.
- Optimization (code-splitting and lazy loading) can be tackled as the next step.
- Admin scaffold now syncs to local mock API with local fallback and supports JSON import/export for handoff/versioning.
- Mock API data persists in SQLite at `server/storage/trapmadeit.db`.

## Mock API Scope

The local API now includes placeholder implementations for the full planned backend surface:

- Auth and accounts
- CMS publishing and product/chapter management
- Commerce flow (products, discounts, checkout, refunds, fulfillment)
- Player progress and rewards claim anti-abuse rules
- Ops analytics and moderation workflows
- Community stories, opportunities, chapter events, and leaderboard

Default admin login for local testing:

- Email: `admin@trapmadeit.local`
- Password: `admin123`

## API Groups

- Health: `/api/health`
- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- Content/CMS: `/api/content`, `/api/cms/chapters`, `/api/cms/drops`, `/api/cms/publish`
- Player: `/api/player/:playerId`
- Events: `/api/events`
- Commerce: `/api/commerce/products`, `/api/commerce/discounts`, `/api/commerce/checkout`, `/api/commerce/orders`, `/api/commerce/refunds`, `/api/commerce/fulfillments`
- Rewards: `/api/rewards/claim`
- Ops: `/api/ops/analytics`, `/api/ops/moderation`
- Community: `/api/community/stories`, `/api/community/opportunities`, `/api/community/chapter-events`, `/api/community/leaderboard`

## Front-end API Service Layer

Client-side service modules are ready for integration in future pages/tools:

- `src/api/client.js`
- `src/api/services/auth.js`
- `src/api/services/cms.js`
- `src/api/services/commerce.js`
- `src/api/services/player.js`
- `src/api/services/ops.js`
- `src/api/services/community.js`

## API Smoke Test

Run end-to-end backend verification (starts mock API, executes route checks, then stops):

```bash
npm run test:api
```
