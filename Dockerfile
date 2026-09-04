FROM node:24-alpine AS base

WORKDIR /app

RUN corepack enable


FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile


FROM dependencies AS builder

COPY . .

RUN pnpm build


FROM base AS production

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]