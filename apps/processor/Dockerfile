# Build from repo root so pnpm can use the workspace lockfile:
#   docker build -f apps/processor/Dockerfile .
FROM node:22-alpine AS deps
WORKDIR /repo
RUN corepack enable && corepack prepare pnpm@12.0.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/processor/package.json apps/processor/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/db/package.json packages/db/package.json

RUN pnpm install --frozen-lockfile --filter processor... --prod

COPY apps/processor/src apps/processor/src

# Keep the pnpm layout (apps/processor/node_modules -> ../../../node_modules/.pnpm).
# pnpm deploy --legacy walks the full workspace lockfile and pulls web deps too.
FROM oven/bun:1-alpine
WORKDIR /repo/apps/processor
COPY --from=deps /repo /repo
CMD ["bun", "run", "src/index.ts"]
