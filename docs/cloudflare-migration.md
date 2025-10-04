# Cloudflare to Self-Hosted Migration Guide

## Overview
This document outlines service replacements for migrating from Cloudflare Workers to a containerized, self-hosted environment.

## Runtime
**Cloudflare Workers** → **Bun**
- Use `oven/bun:alpine` as Docker base image
- Maintains fast cold starts
- Native TypeScript support
- Compatible with existing code structure

## Database
**D1** → **Bun SQLite** (primary) → **Vitess** (scale) → **PostgreSQL** (fallback)

### Bun SQLite ⭐ Recommended
- Direct compatibility (D1 is SQLite)
- Drizzle ORM already supports it
- Single-node deployment simplicity
- File-based or in-memory

```typescript
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database("app.db");
const db = drizzle(sqlite);
```

### Vitess (Horizontal Scaling)
- MySQL wire protocol
- Horizontal sharding when needed
- Drizzle supports MySQL dialect

### PostgreSQL (Alternative)
- If team prefers Postgres ecosystem
- Drizzle has full support
- Rich extension ecosystem (pgvector, etc.)

## Object Storage
**R2** → **MinIO** ⭐

Uses Bun's native S3-compatible client:
```typescript
const s3 = new Bun.S3({
  endpoint: "http://minio:9000",
  accessKeyId: process.env.MINIO_ACCESS_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
});

await s3.put("bucket/key", file);
const object = await s3.get("bucket/key");
```

MinIO deployment:
- S3-compatible API
- Self-hostable
- Docker-ready
- Production-proven

## Key-Value Store
**KV** → **Valkey** / **DragonflyDB** / **Redis**

Uses Bun's native Redis client:
```typescript
import { Redis } from "bun";

const redis = new Redis({
  hostname: "valkey",
  port: 6379,
});

await redis.set("key", "value");
const value = await redis.get("key");
```

### Valkey ⭐ Slight Edge
- Redis fork, community-driven
- Battle-tested Redis protocol
- Active development

### DragonflyDB (Performance)
- Modern architecture
- Lower memory usage
- Faster than Redis

### Redis (Safe Choice)
- Original, well-known
- Extensive ecosystem

## Queues
**Queues** → **Effect Queue + Platform** ⭐

### Effect-based (Recommended)
```typescript
import { Queue, Effect } from "effect";
import { BunRuntime } from "@effect/platform-bun";

// In-memory with Effect
const queue = yield* Queue.bounded<Job>(100);

// Persist to Redis via Layer
const persistedQueue = queue.pipe(
  Effect.provideLayer(RedisPersistenceLayer)
);
```

### Alternative: BullMQ
- If need turnkey solution
- Built-in UI dashboard
- Redis-backed
- Well-established patterns

## Cron/Scheduled Tasks
**Cron Triggers** → **Effect Schedule** ⭐

```typescript
import { Schedule, Effect } from "effect";

const job = Effect.gen(function* () {
  // Job logic
}).pipe(
  Effect.schedule(Schedule.cron("0 * * * *")),
  Effect.forkDaemon
);
```

### Alternative: Kubernetes CronJobs
- External to application
- Familiar to ops teams
- Language-agnostic

## Durable Objects
**Durable Objects** → **Temporal** / **Redis Locks + Effect**

### Temporal ⭐ Recommended for Complex Workflows
- Durable execution semantics
- Built-in retries, versioning
- Strong consistency guarantees
- TypeScript SDK available

### Redis Locks + Effect Ref (Simple Cases)
```typescript
import { Ref, Effect } from "effect";
import Redlock from "redlock";

const acquireLock = (id: string) =>
  Effect.tryPromise(() =>
    redlock.acquire([`lock:${id}`], 5000)
  );

const actor = Effect.gen(function* () {
  const lock = yield* acquireLock(actorId);
  const state = yield* Ref.make(initialState);

  // Process messages sequentially
  yield* processMessages(state);

  yield* Effect.promise(() => lock.release());
});
```

## Analytics

### Product Analytics
**Analytics Engine** → **PostHog** ⭐ / **Umami** / **Plausible**

### PostHog ⭐ Recommended for Full Product Analytics
- Self-hostable, full product analytics suite
- Session replay, feature flags, A/B testing
- Funnels, cohorts, user tracking
- Event tracking and custom properties
- Requires: Postgres, Redis, ClickHouse
- Docker-ready

```typescript
import posthog from 'posthog-js';

posthog.init('YOUR_API_KEY', {
  api_host: 'https://your-posthog-instance.com'
});

posthog.capture('event_name', { property: 'value' });
```

### Umami (Privacy-Focused + Lightweight)
- GDPR compliant, no cookies
- Simple events tracking
- Self-hostable
- Requires: Just Postgres
- Very lightweight (<2KB script)
- Good middle ground

### Plausible (Privacy-First Web Analytics)
- Simplest privacy-first option
- No cookies, GDPR compliant by default
- Lightweight script (<1KB)
- Just page views, goals, conversions
- Requires: Postgres, ClickHouse
- Clean, simple dashboard

### Matomo (Full-Featured, Privacy-Focused)
- GDPR/CCPA compliant
- Feature-rich (Google Analytics alternative)
- Self-hostable
- Heavier than Plausible/Umami
- Requires: MySQL/MariaDB

**Comparison:**

| Tool | Privacy | Features | Infrastructure | Use Case |
|------|---------|----------|----------------|----------|
| **PostHog** | Good | Full product analytics | Heavy (Postgres + Redis + ClickHouse) | Product teams, A/B testing |
| **Umami** | Excellent | Web + custom events | Light (Postgres only) | Simple tracking, privacy-focused |
| **Plausible** | Excellent | Basic web analytics | Medium (Postgres + ClickHouse) | Clean web analytics |
| **Matomo** | Excellent | Full like GA | Medium (MySQL) | GA replacement |

### Raw Event Storage
For custom analytics pipelines:
- **ClickHouse**: Columnar, fast aggregations
- **TimescaleDB**: PostgreSQL extension, familiar SQL

## Other Services

### Hyperdrive
Not needed - direct database connections work in containerized environment

### Vectorize
- **Qdrant**: Rust-based, Docker-ready
- **Weaviate**: Feature-rich
- **pgvector**: If using Postgres

### AI Bindings
Direct API calls to OpenAI, Anthropic, etc.

### Secrets Management
- **Vault**: Industry standard
- **Kubernetes Secrets**: If on k8s
- **sealed-secrets**: GitOps-friendly

## Deployment Stack

### Development
```yaml
# docker-compose.yml
services:
  app:
    build: .
    image: oven/bun:alpine

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"

  valkey:
    image: valkey/valkey

  # No separate DB container needed for SQLite
```

### Production Options
- **Kubernetes**: Full control, complex
- **Nomad**: Simpler than k8s
- **Fly.io**: Managed, still containerized
- **Railway/Render**: Easiest, less control

## Migration Checklist

1. Replace `env.DB` (D1) → Drizzle with `bun:sqlite`
2. Replace `env.KV` → Bun Redis client + Valkey
3. Replace `env.BUCKET` (R2) → Bun S3 client + MinIO
4. Replace `env.QUEUE` → Effect Queue with Redis persistence
5. Move cron triggers → Effect Schedule
6. Replace Durable Objects → Temporal or lock-based actors
7. Update `wrangler.jsonc` bindings → environment variables
8. Create Dockerfile with Bun runtime
9. Set up docker-compose for local development
10. Configure secrets management

## Code Changes Required

### Minimal changes in application logic:
- Auth cookie handling already standard (no changes)
- Server actions already return plain objects (no changes)
- Database access through Drizzle (change connection only)
- Queue/KV/Storage access abstracted through Effect Layers

### Configuration changes:
- Environment variables replace bindings
- Connection strings instead of binding names
- Service discovery for containerized services

## Technology Summary

| Cloudflare Service | Replacement | Client |
|-------------------|-------------|---------|
| Workers | Bun | Runtime |
| D1 | Bun SQLite | `bun:sqlite` |
| KV | Valkey | `bun` Redis |
| R2 | MinIO | `bun` S3 |
| Queues | Effect Queue | `effect` |
| Cron | Effect Schedule | `effect` |
| Durable Objects | Temporal | TypeScript SDK |
| Analytics Engine | PostHog / Umami | TypeScript SDK / Script |

⭐ = Recommended first choice
