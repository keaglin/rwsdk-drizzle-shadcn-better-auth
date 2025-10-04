# Build stage
FROM oven/bun:1-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install production dependencies
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Build stage
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN bun run build

# Production stage
FROM oven/bun:1-alpine

WORKDIR /app

# Install tini for signal handling
RUN apk add --no-cache tini

# Copy production dependencies and built app
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /app/dist dist
COPY package.json .

# Use built-in bun user (already exists in oven/bun:alpine)
USER bun

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD bun fetch http://localhost:3000/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["bun", "run", "dist/worker.js"]
