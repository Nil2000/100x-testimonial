# Testimonial 100x

## Overview

Testimonial 100x is a testimonials collection and showcase platform.

It lets you:

- create a “space” for a product/service
- collect text and/or video testimonials via a public link
- manage testimonials in an admin dashboard
- publish a “Wall of Love” (embeddable testimonial wall)
- optionally enrich testimonials with background analysis (spam/sentiment/transcription) via a worker

The repo contains:

- `web_app/`: Next.js application (UI + server actions + API routes)
- `processor/`: background worker (Bun) consuming Kafka messages for async processing

## Services / Infrastructure Used

- **PostgreSQL**: Primary database for users, spaces, questions, and testimonials/feedback.
- **Prisma**: ORM + migrations for type-safe database access.
- **NextAuth (Auth.js v5 beta)**: Dashboard authentication (Google OAuth) and session/JWT handling.
- **MinIO (S3-compatible storage)**: Stores uploaded assets (logos, images, videos) and imported media in local/dev.
- **Apache Kafka**: Message queue for async processing between `web_app` and `processor`.
- **OpenAI (optional)**: Used by `processor` for analysis/transcription (requires `OPENAI_API_KEY`).
- **PostHog (optional)**: Analytics and metrics queries (requires PostHog env vars).

## Local Development Setup

### Prerequisites

- Node.js (for `web_app/`)
- pnpm (recommended) or npm/yarn
- Docker + Docker Compose
- Bun (for `processor/`) if you want to run background workers locally

### 1) Start local infrastructure (Postgres + MinIO + Kafka)

From the repo root:

```bash
docker compose -f docker-compose.dev.yml up -d
```

This starts:

- Postgres on `localhost:5432`
- MinIO on `localhost:9000` (console `localhost:9001`)
- Kafka on `localhost:9092`

### 2) Configure environment variables

Copy the example env files and then update the values as needed:

```bash
cp web_app/.env.example web_app/.env
cp processor/.env.example processor/.env
```

Make sure `INTERNAL_API_KEY` matches in both files (the processor calls `web_app` via `/api/update_feedback`).

This repo expects environment variables for:

- Database

  - `DATABASE_URL`

- Auth (Google OAuth)

  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`

- S3/MinIO

  - `S3_ENDPOINT`
  - `S3_PORT`
  - `S3_USE_SSL`
  - `S3_ACCESS_KEY`
  - `S3_SECRET_KEY`
  - `S3_BUCKET`
  - `S3_PUBLIC_CUSTOM_DOMAIN` (optional)
  - `S3_SSL` (used to build public URLs)

- Kafka

  - `KAFKA_BROKER`
  - `KAFKA_CLIENT_ID`
  - `KAFKA_TEXT_TOPIC` (optional)
  - `KAFKA_VIDEO_TOPIC` (optional)
  - `KAFKA_TEXT_GROUP_ID` (processor)
  - `KAFKA_VIDEO_GROUP_ID` (processor)

- Social import (X/Twitter)

  - `TWITTER_TOKEN`

- Analytics (PostHog)

  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST`
  - `POSTHOG_METRICS_QUERY_URL`
  - `POSTHOG_QUERY_TOKEN`

- Optional worker/AI
  - `OPENAI_API_KEY`

Notes:

- The concrete `.env` files live inside `web_app/` and `processor/` (they are gitignored).
- Use `docker-compose.dev.yml` defaults for local MinIO/Kafka/Postgres values.

### 3) Setup and run the web app

```bash
cd web_app
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm dev
```

App will be available at `http://localhost:3000`.

### 4) (Optional) Run the background processor

In another terminal:

```bash
cd processor
bun install
bun run text_processor
# and/or
bun run video_processor
```

The worker consumes messages from Kafka and performs async processing.
