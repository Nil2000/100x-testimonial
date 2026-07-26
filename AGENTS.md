# AGENTS.md — AI Agent Guide for Testimonial 100x

This file is the **source of truth for AI coding agents** working in this repository. Read it before making changes. When unsure, **verify in the codebase** — do not invent APIs, env vars, routes, or dependencies that are not documented here or present in code.

---

## What This Project Is

**Testimonial 100x** is a testimonials collection and showcase platform. Users (admins) create **Spaces** to collect text and/or video testimonials from the public, manage them in a dashboard, and publish a **Wall of Love** (embeddable testimonial wall).

### Core user flows

1. **Admin** signs in with Google OAuth → creates a Space → configures questions, theme, collection type → publishes the space.
2. **Public visitor** visits `/{spaceName}` → submits text and/or video testimonial → sees thank-you page.
3. **Admin** reviews testimonials in `/space/[id]` → toggles Wall of Love visibility, archives spam, customizes embed styles.
4. **Optional async processing**: when spam/sentiment analysis is enabled on a space, feedback is queued to Redis; the `processor` worker analyzes it and calls back into the web app.

---

## Repository Layout

```
testimonial-100x/
├── package.json            # Root workspace (pnpm + turbo)
├── pnpm-workspace.yaml     # apps/*, packages/*
├── turbo.json
├── apps/
│   ├── web/                # Next.js 15 app (UI, server actions, API routes)
│   └── processor/          # Bun background worker (Redis consumer, AI analysis)
├── packages/
│   └── db/                 # Prisma schema, migrations, client (`@repo/db`)
├── docker-compose.dev.yml  # Local Postgres, MinIO, Redis
├── README.md               # Human-oriented setup guide
└── AGENTS.md               # This file
```

pnpm workspaces + Turborepo at the root. Install once from repo root (`pnpm install`). Processor still runs with Bun; web is Next.js via pnpm.

---

## Tech Stack (Verified)

| Layer | Technology |
|-------|------------|
| Web framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript (strict) |
| Package manager (web) | pnpm 11 |
| Runtime (processor) | Bun |
| Database | PostgreSQL 17 |
| ORM | Prisma 7 (`packages/db/prisma/schema.prisma`, package `@repo/db`) |
| Prisma client output | `packages/db/generated/prisma/` (import via `@repo/db`, `@repo/db/client`, `@repo/db/enums`) |
| Auth | NextAuth v5 beta (`next-auth@5.0.0-beta.25`), Google OAuth only |
| File storage | MinIO (S3-compatible) via `minio` npm package |
| Queue | Redis (ioredis), list-based `rpush` / `blpop` |
| AI (processor) | **OpenRouter API** (`OPENROUTER_API_KEY`) — not direct OpenAI |
| Analytics (optional) | PostHog |
| UI components | shadcn/ui (Radix + Tailwind) in `apps/web/components/ui/` |
| Styling | Tailwind CSS 3, `next-themes` for dark mode |
| Forms | react-hook-form + zod schemas in `apps/web/schemas/` |
| State | zustand (local UI state where used) |

---

## Domain Model & Terminology

Use these terms consistently. **Do not rename** without a migration.

| Term | Meaning |
|------|---------|
| **Space** | A testimonial collection page owned by a user. Identified by `id` (cuid) and public slug `name` (URL segment). |
| **Feedback** | A submitted testimonial (DB model `Feedback`). Often called "testimonial" in UI copy. |
| **Wall of Love** | Public page showing approved testimonials (`addToWallOfLove: true`). Route: `/{spaceName}/wall-of-love`. |
| **Question** | Prompt shown on the public collection form. Belongs to a Space. |
| **ThankYouSpace** | Post-submission thank-you page config for a Space. |
| **CollectionType** | `TEXT`, `VIDEO`, or `TEXT_AND_VIDEO` — what the space accepts. |
| **FeedbackType** | Type stored on each feedback record. |
| **Published space** | `Space.isPublished === true` and `deletedAt === null`. Public routes require this. |
| **Embed** | Single testimonial embed at `/embed/[feedbackId]`. |

### Key Prisma models

- `User` — admin account, `plan`, `role`, subscription fields
- `Space` — `name` (slug), `theme` (JSON), `isSentimentEnabled`, `isSpamEnabled`, `isPublished`
- `Feedback` — `answer`, `videoUrl`, `rating`, `addToWallOfLove`, `isSpam`, `sentiment`, `styleSettings` (JSON), `isArchived`
- `Question`, `ThankYouSpace`, `Account` (OAuth), `VerificationToken`, `PasswordResetToken`

Enums live in `@repo/db/enums` after `prisma generate`. Import enums from `@repo/db/enums` or `@repo/db/client`.

### Subscription plans

Defined in `apps/web/lib/subscription.ts` — `FREE`, `TRIAL`, `STARTER`, `PROFESSIONAL`, `ENTERPRISE`. Limits enforced via `apps/web/lib/accessControl.ts` (`checkUserAccess`). Trial duration: 7 days.

---

## Application Routes

### Public pages (no auth)

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/auth/signin`, `/auth/signup` | Auth flows |
| `/{spaceName}` | Public testimonial collection form |
| `/{spaceName}/wall-of-love` | Published testimonial wall |
| `/{spaceName}/testimonial/[testimonialId]` | Single public testimonial view |
| `/embed/[feedbackId]` | Embeddable single testimonial widget |

`spaceName` must **not** match reserved segments in `apps/web/lib/routes.ts` (`dashboard`, `space`, `auth`, `api`, `embed`, etc.).

### Protected pages (session required)

| Route | Purpose |
|-------|---------|
| `/dashboard` | User's spaces overview |
| `/dashboard/spaces/create` | Create new space |
| `/space/[id]` | Space admin (testimonials, settings, sharing, analytics) |
| `/buy-premium` | Upgrade flow |

Auth enforced in `apps/web/middleware.ts` using helpers from `apps/web/lib/routes.ts`.

### API routes (`apps/web/app/api/`)

| Route | Auth | Purpose |
|-------|------|---------|
| `/api/auth/[...nextauth]` | Public | NextAuth handlers |
| `/api/update_feedback` | `INTERNAL_API_KEY` header | Processor callback to update feedback analysis |
| `/api/spaces` | Session | Spaces CRUD/list |
| `/api/space/[id]` | Session | Single space |
| `/api/testimonials` | Session | Testimonials API |
| `/api/public-space/[spaceName]` | Public | Public space data |
| `/api/metrics` | Session | PostHog metrics proxy |

**Rule:** All `/api/*` routes require a session **except** those in `publicApiPrefixes` (`/api/auth`, `/api/update_feedback`).

---

## Architecture & Data Flow

### Web app layers

```
app/                    # Next.js App Router pages & layouts
  (protected)/          # Authenticated routes
  (not-protected)/      # Public routes
actions/                # Server actions ("use server") — primary mutation layer
app/api/                # REST API routes (some used by client, processor uses update_feedback)
lib/                    # Shared utilities, auth, queue, storage, guards
components/             # React components (ui/ = shadcn)
schemas/                # Zod validation schemas
data/                   # Data access helpers (e.g. data/user.ts)
```

Prisma lives in `packages/db` (`@repo/db`), not under the web app.

### Path alias

`@/*` maps to `apps/web/*` (see `apps/web/tsconfig.json`).

### Server actions (preferred for mutations)

Located in `apps/web/actions/`:

- `spaceActions.ts` — create/update/publish spaces, thank-you page
- `feedbackActions.ts` — submit text/video feedback, wall-of-love toggle, archive
- `fileAction.ts` — S3/MinIO uploads
- `themeActions.ts` — space theme updates
- `userActions.ts` — user profile
- `subscriptionActions.ts` — plan/trial

**Pattern:** Actions return `{ error: string }` or `{ message: string }` (sometimes extra fields). Use `requireAuth()` and `assertSpaceOwnership()` / `assertFeedbackOwnership()` from `apps/web/lib/authGuards.ts` for authorization.

### Auth implementation

- Config: `apps/web/lib/auth.config.ts` (Google provider)
- Full setup: `apps/web/lib/auth.ts` (Prisma adapter, JWT session, role in token)
- Session includes `user.id` and `user.role` (`ADMIN` | `SUPERADMIN` | `MEMBER`)
- **Credentials provider exists in callbacks but Google is the active provider**

### File uploads

- MinIO client: `apps/web/lib/storage/initClient.ts`
- Uploads go to `S3_BUCKET` under `public/{key}` prefix
- Public URL built via `apps/web/lib/storage/parseS3publicBaseUrl.ts`
- Server action: `uploadFileToBucket` in `apps/web/actions/fileAction.ts`

### Async feedback processing

```
Public form submit (feedbackActions)
  → db.feedback.create()
  → if space.isSentimentEnabled || space.isSpamEnabled:
       sendMessageToQueue(JSON) via Redis rpush
  → processor blpop on queue
  → analyzeSpam / analyzeSentiment / getVideoTranscription (OpenRouter)
  → PUT /api/update_feedback with INTERNAL_API_KEY
  → db.feedback updated
```

Processor entry point:

- `apps/processor/src/index.ts` — single worker; listens on `REDIS_QUEUE`, dispatches text vs video via `feedback.isVideo`
- Run from root: `pnpm processor:start`

---

## Environment Variables

Single root env file. Copy once:

```bash
cp .env.example .env
```

Scripts load it via `dotenv-cli` (`dotenv -e .env -- …` at root, `dotenv -e ../../.env -- …` in apps/packages). Do not rely on per-app `.env` for new setup (existing app `.env` files are left alone for you to migrate).

### Root `.env` (from `.env.example`)

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_BASE_URL` | Yes | e.g. `http://localhost:3000` |
| `AUTH_SECRET` | Yes | NextAuth secret |
| `INTERNAL_API_KEY` | Yes | Must match web ↔ processor; secures `/api/update_feedback` |
| `GOOGLE_CLIENT_ID` | Yes (prod) | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Yes (prod) | Google OAuth |
| `S3_ENDPOINT`, `S3_PORT`, `S3_USE_SSL`, `S3_SSL` | Yes | MinIO/S3 config |
| `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET` | Yes | Storage credentials |
| `S3_PUBLIC_CUSTOM_DOMAIN` | No | Custom CDN domain for public URLs |
| `REDIS_URL` | Yes (if using analysis) | e.g. `redis://localhost:6379` |
| `REDIS_QUEUE` | Yes (if using analysis) | Single Redis list; web `rpush`, processor `blpop` |
| `REDIS_TEXT_QUEUE`, `REDIS_VIDEO_QUEUE` | Legacy / unused by unified worker | Prefer `REDIS_QUEUE` |
| `APP_URL` | Yes (processor) | Web app base URL for callbacks |
| `OPENROUTER_API_KEY` | Yes (if analysis enabled) | AI provider |
| `NEXT_PUBLIC_POSTHOG_*`, `POSTHOG_*` | No | Analytics |
| `NEXT_PUBLIC_UPLOAD_VIDEO_MAX_SIZE` | No | MB, default 5 |
| `NEXT_PUBLIC_UPLOAD_VIDEO_MAX_DURATION` | No | Minutes, default 5 |

---

## Known Gaps & Anti-Hallucination Rules

**Verify these in code before assuming they are fixed.**

1. **Queue naming leftovers:** Root `.env.example` still lists `REDIS_TEXT_QUEUE` / `REDIS_VIDEO_QUEUE`, but the unified worker and web publisher both use `REDIS_QUEUE`. Keep those three aligned or drop the unused pair.

2. **README env vars:** Prefer root `.env.example` over any leftover mentions of `REDIS_HOST` / `OPENAI_API_KEY` in old docs; code uses `REDIS_URL` and `OPENROUTER_API_KEY`.

3. **Kafka constants are dead code:** `KAFKA_QUEUE` in `apps/web/lib/constants.ts` is legacy naming. The system uses Redis lists, not Kafka.

4. **Prisma client path:** Import from `@repo/db`, `@repo/db/client`, and `@repo/db/enums` — not `@prisma/client` or `@/generated/prisma`.

5. **No tRPC, no GraphQL** — mutations are server actions; some reads use API routes.

6. **No email/password sign-up in active use** — Google OAuth is the primary auth path.

7. **No Stripe/payment integration in codebase** — `buy-premium` page exists; subscription is plan-field based, not live billing.

8. **Soft delete for spaces:** `Space.deletedAt` — queries should filter `deletedAt: null`.

9. **Public testimonials filter:** Wall of Love shows feedback where `addToWallOfLove: true`, `isArchived: false`, `isSpam: false`, and space is published.

10. **Do not create files outside established patterns** — follow existing `actions/`, `lib/`, `schemas/`, `components/` structure.

---

## Coding Conventions

### TypeScript & React

- Functional components only
- Strict TypeScript — avoid `any` unless matching existing patterns (some legacy `any` exists)
- Use `"use server"` at top of server action files
- Colocate route-specific components in `_components/` next to pages
- Client components: add `"use client"` only when needed (hooks, browser APIs, interactivity)

### Styling

- Tailwind utility classes
- shadcn/ui components in `components/ui/` — extend via `className` + `cn()` from `@/lib/utils`
- Theme: CSS variables, dark mode via `next-themes`

### Validation

- Zod schemas in `apps/web/schemas/`
- Validate in server actions with `schema.safeParse(values)` before DB writes

### Database

- Schema changes: edit `packages/db/prisma/schema.prisma` → `pnpm db:migrate`
- Always run `pnpm db:generate` after schema changes
- Use `db` export from `@repo/db`

### Error handling in actions

```typescript
// Standard pattern
const authResult = await requireAuth();
if ("error" in authResult) {
  return { error: authResult.error };
}
// ... try/catch with console.error("DESCRIPTIVE_TAG", error)
return { error: "User-facing message" };
```

### Authorization

Always use guards from `@/lib/authGuards`:

- `requireAuth()` — logged-in user
- `assertSpaceOwnership(userId, spaceId)` — space belongs to user
- `assertFeedbackOwnership(userId, feedbackId)` — feedback in user's space
- `assertPublishedSpace(spaceId)` — public submission allowed

### Imports

```typescript
import { db } from "@repo/db";
import { FeedbackType } from "@repo/db/enums";
import { requireAuth } from "@/lib/authGuards";
```

---

## Development Commands

### Infrastructure (repo root)

```bash
docker compose -f docker-compose.dev.yml up -d
```

Starts Postgres (`5432`), MinIO (`9000`/`9001`), Redis (`6379`).

### Install (repo root)

```bash
cp .env.example .env   # then fill in secrets
pnpm install
```

### Web app

```bash
cd apps/web
# env comes from repo-root .env via dotenv-cli in scripts
pnpm db:generate       # from root, or: pnpm --filter @repo/db db:generate
pnpm db:migrate        # from root
pnpm dev               # http://localhost:3000
# or from root: pnpm turbo run dev --filter=web
```

### Database (`@repo/db`)

```bash
pnpm db:generate       # prisma generate in packages/db
pnpm db:migrate        # prisma migrate dev
pnpm db:studio
```

### Processor (optional)

```bash
# from root (loads root .env) — one worker for text + video
pnpm processor:start
```

### CI checks (match before PR)

Path-filtered workflows under `.github/workflows/`:

| Workflow | Paths | Commands |
|----------|-------|----------|
| `ci_web.yml` | `apps/web/**`, `packages/db/**` | typecheck, lint, build (`--filter=web`) |
| `ci_processor.yml` | `apps/processor/**` | typecheck, lint, build (`--filter=processor`) |
| `ci_db.yml` | `packages/db/**` | `db:generate`, typecheck (`--filter=@repo/db`) |

Locally (same idea):

```bash
pnpm exec dotenv -e .env -- turbo run typecheck lint build --filter=web
pnpm exec turbo run typecheck lint build --filter=processor
pnpm exec dotenv -e .env -- turbo run db:generate typecheck --filter=@repo/db
```

---

## Key Files Quick Reference

| Need to… | Look at |
|----------|---------|
| Change auth / session | `apps/web/lib/auth.ts`, `auth.config.ts`, `middleware.ts` |
| Add route protection | `apps/web/lib/routes.ts`, `middleware.ts` |
| Add DB model | `packages/db/prisma/schema.prisma` |
| Add mutation | `apps/web/actions/*.ts` |
| Add API endpoint | `apps/web/app/api/**/route.ts` |
| Check plan limits | `apps/web/lib/subscription.ts`, `accessControl.ts` |
| Public data shaping | `apps/web/lib/publicData.ts` |
| Queue publish | `apps/web/lib/queue/sendMessage.ts` |
| Queue consume | `apps/processor/src/index.ts`, `apps/processor/src/queue/client.ts` |
| AI analysis | `apps/processor/src/ai/`, `apps/processor/src/utility/processTextMessage.ts` / `processVideoMessage.ts` |
| Upload files | `apps/web/actions/fileAction.ts`, `lib/storage/` |
| UI primitives | `apps/web/components/ui/` |
| App logo | `apps/web/components/app-logo.tsx` |

---

## What to Do When Changing Features

1. **Read relevant action + guard + schema** before editing UI.
2. **Check Prisma schema** if touching data shape — add migration.
3. **Update both sides** if changing processor ↔ web app contract (`/api/update_feedback` payload, queue message JSON).
4. **Keep `INTERNAL_API_KEY` in sync** in the root `.env` (shared by web and processor).
5. **Test public vs protected paths** — middleware behavior differs for pages vs API.
6. **Do not commit** `.env` files or secrets.
7. **Minimize scope** — match existing patterns; no drive-by refactors.

---

## Agent Behavior Guidelines

- **Search the codebase** before creating new utilities — likely already exists in `lib/` or `actions/`.
- **Do not invent** npm packages, env vars, API endpoints, or DB columns.
- **Prefer server actions** over new API routes for dashboard mutations unless there's an existing API pattern for that feature.
- **Run typecheck/lint** on touched package after substantive changes.
- **Only commit when explicitly asked** by the user.
- When documentation conflicts, **trust this file and the code** over `README.md` or generic Next.js assumptions.

---

*Last aligned with codebase: July 2026. Update this file when architecture, env vars, or major conventions change.*
