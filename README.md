# Testimonial 100x

Collect, manage, and showcase testimonials — text and video — from a single space.

Admins create a **Space**, share a public link, review submissions in a dashboard, and publish a **Wall of Love** (or embed individual testimonials). Optional background workers can run spam/sentiment analysis and video transcription via OpenRouter.

---

## What you can do

| Role | Flow |
|------|------|
| **Admin** | Sign in with Google → create a Space → set questions, theme, and collection type → publish |
| **Visitor** | Open `/{spaceName}` → submit text and/or video → thank-you page |
| **Admin** | Review in `/space/[id]` → Wall of Love, archive, embeds, analytics |
| **Worker** (optional) | Redis queue → analyze feedback → callback to the web API |

---

## Monorepo layout

```
testimonial-100x/
├── apps/
│   ├── web/          # Next.js 15 app (UI, server actions, API)
│   └── processor/    # Bun workers (text + video queue consumers)
├── packages/
│   └── db/           # Prisma schema, migrations, client (@repo/db)
├── docker-compose.dev.yml
├── package.json      # pnpm + Turborepo scripts
├── .env.example      # single env template for the whole repo
└── AGENTS.md         # deeper architecture notes for contributors / agents
```

| Package | Role |
|---------|------|
| `apps/web` | Dashboard, public collection pages, Wall of Love, embeds |
| `apps/processor` | Async spam/sentiment/transcription (Bun + OpenRouter) |
| `packages/db` | Shared Prisma client — import as `@repo/db` |

---

## Stack

- **Web:** Next.js 15 (App Router), React 19, Tailwind, shadcn/ui
- **Auth:** NextAuth v5 (Google OAuth)
- **DB:** PostgreSQL 17 + Prisma 7 (`@repo/db`)
- **Storage:** MinIO (S3-compatible) for logos, images, videos
- **Queue:** Redis lists (`rpush` / `blpop`)
- **AI:** OpenRouter (`OPENROUTER_API_KEY`) — not direct OpenAI
- **Tooling:** pnpm workspaces + Turborepo; Bun for the processor runtime
- **Analytics (optional):** PostHog

---

## Prerequisites

- **Node.js** 20+ and **pnpm** 11
- **Docker** + Docker Compose (Postgres, MinIO, Redis)
- **Bun** (only if you run the processor locally)

---

## Local setup

### 1. Infrastructure

```bash
docker compose -f docker-compose.dev.yml up -d
```

| Service | Port |
|---------|------|
| Postgres | `5432` (db `testimonials`, password `testimonials`) |
| MinIO API | `9000` (console `9001`, user/pass `minio` / `minio123`) |
| Redis | `6379` |

Compose also creates the `100xtestimonials` bucket with a public prefix for uploads.

### 2. Environment

One env file at the repo root (loaded by `dotenv-cli` in scripts):

```bash
cp .env.example .env
```

Fill in at least:

- `AUTH_SECRET` — random string for NextAuth
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — for sign-in
- `INTERNAL_API_KEY` — shared secret for processor → web callbacks
- `OPENROUTER_API_KEY` — only if you enable analysis workers

Defaults for `DATABASE_URL`, MinIO, and Redis match `docker-compose.dev.yml`.

See [`.env.example`](.env.example) for the full list.

### 3. Install, migrate, run

From the **repo root**:

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm dev
```

App: [http://localhost:3000](http://localhost:3000)

### 4. Background worker (optional)

Needed when a Space has spam/sentiment analysis enabled. One process handles both text and video:

```bash
pnpm processor:start
```

It listens on `REDIS_QUEUE`, routes by `feedback.isVideo`, and `PUT`s results to `/api/update_feedback` using `INTERNAL_API_KEY`.

---

## Useful scripts (root)

| Command | What it does |
|---------|----------------|
| `pnpm dev` | Turbo dev (web; prisma generate first) |
| `pnpm build` | Production build |
| `pnpm typecheck` / `pnpm lint` | Checks across packages |
| `pnpm db:generate` | `prisma generate` in `@repo/db` |
| `pnpm db:migrate` | `prisma migrate dev` |
| `pnpm db:studio` | Prisma Studio |
| `pnpm processor:start` | Start the analysis worker (text + video) |

CI: path-filtered `ci_web`, `ci_processor`, and `ci_db` workflows (see `.github/workflows/`).

---

## Key URLs

| Path | Who | Purpose |
|------|-----|---------|
| `/` | Public | Landing |
| `/auth/signin` | Public | Google sign-in |
| `/dashboard` | Admin | Your spaces |
| `/dashboard/spaces/create` | Admin | New space |
| `/space/[id]` | Admin | Manage testimonials & settings |
| `/{spaceName}` | Public | Collection form |
| `/{spaceName}/wall-of-love` | Public | Published wall |
| `/embed/[feedbackId]` | Public | Single-testimonial embed |

---

## How the pieces talk

```
Visitor submits feedback
        │
        ▼
   apps/web (Prisma via @repo/db)
        │
        │  if spam/sentiment enabled → Redis rpush
        ▼
 apps/processor (blpop → OpenRouter; text or video by payload)
        │
        │  PUT /api/update_feedback + INTERNAL_API_KEY
        ▼
   Feedback row updated (spam / sentiment / transcript)
```

Uploads go to MinIO under `public/…`; public URLs are built from `S3_*` env vars.

---

## Contributing notes

- Prefer **server actions** in `apps/web/actions/` for dashboard mutations.
- DB schema lives in `packages/db/prisma/` — change it there, then `pnpm db:migrate`.
- Import the client as `import { db } from "@repo/db"` (enums: `@repo/db/enums`).
- For architecture, env quirks, and coding conventions, see [AGENTS.md](AGENTS.md).
