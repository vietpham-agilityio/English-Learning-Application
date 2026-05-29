ARG NODE_VERSION=22.13.1
ARG PNPM_VERSION=10.3.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

FROM base AS build

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter backend --ignore-scripts

COPY apps/backend ./apps/backend

RUN pnpm --filter backend deploy --legacy /deploy

FROM base AS final

ENV NODE_ENV=production

WORKDIR /app

RUN chown node:node /app

USER node

COPY --chown=node:node --from=build /deploy .

EXPOSE 3001

CMD ["./node_modules/.bin/tsx", "src/server.ts"]
