# ---- Base ----
FROM node:20-slim AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json ./
RUN npm install --omit=dev

# ---- Builder ----
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Runner ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 9002
ENV PORT 9002

CMD ["npm", "start", "--", "-p", "9002"]
