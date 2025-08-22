# RWSDK + Drizzle + Better Auth Starter

A modern full-stack starter template featuring server-side rendering, React Server Components, authentication, and database integration on Cloudflare Workers.

## Tech Stack

- **[RWSDK](https://rwsdk.com/)** - React framework for Cloudflare Workers with SSR and RSC support
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM with D1 database
- **[Better Auth](https://better-auth.com/)** - Authentication library with session management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Copy-paste React components built on Radix UI and Tailwind
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)** - SQLite database at the edge

## Getting Started

### Prerequisites

- Node.js 24+ and bun/npm/pnpm
- Cloudflare account (free tier works)
- Wrangler CLI (`npm install -g wrangler`)

### 1. Clone and Install

```bash
git clone <your-repo>
cd rwsdk-drizzle-ba
bun install  # or npm/bun install
```

### 2. Environment Setup

Copy the example env file and configure:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=           # Generate with: openssl rand -base64 32
BETTER_AUTH_URL=              # Default: http://localhost:5173
BA_TRUSTED_ORIGINS=           # Comma-separated list: localhost:5173,your-domain.com

# Database (D1)
CLOUDFLARE_ACCOUNT_ID=    # Cloudflare Account ID
CLOUDFLARE_DATABASE_ID=   # `d1_databases.database_id` from wrangler.jsonc
CLOUDFLARE_D1_TOKEN=      # Cloudflare API Token with D1 Permissions
```

### 3. Database Setup

Create a D1 database:

```bash
bunx wrangler d1 create my-project-db
```

Update `wrangler.jsonc` with the config from wrangler cli. It'll look like this:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "my-project-db",
      "database_id": "your-database-id" 
    }
  ]
}
```

### 4. Generate Schemas and Run Migrations

```bash
# Generate Better Auth schema
bun ba:generate

# Generate Drizzle migrations
bun db:generate

# Apply migrations locally
bun migrate:dev
```

### 5. Start Development Server

```bash
bun dev
```

Visit `http://localhost:5173` to see your app running!

## How It Works

### Architecture Overview

```
Browser ←→ RWSDK Worker ←→ D1 Database
           ├─ /api/auth/* (Better Auth handler)
           ├─ App Routes & Pages
           └─ Server Actions
                              
D1 Database Tables:
├─ Auth tables (users, sessions, accounts)
└─ App tables (your schema)
```

### Key Components

#### RWSDK Worker (`src/worker.tsx`)
- Entry point for all requests
- Handles routing and middleware
- Serves the Better Auth API endpoints at `/api/auth/*`

#### Authentication (`src/lib/auth.ts`)
- Better Auth configuration with email/password support
- Session management with cookies
- Drizzle adapter for D1 database

#### Database (`src/db/`)
- `index.ts` - Database connection and exports
- `schema.ts` - Your application schemas
- `auth-schema.ts` - Auto-generated Better Auth tables

#### Server Actions (`"use server"`)
- Functions that run on the server
- Access to `requestInfo` for headers and cookies
- **Important**: Cannot return Response objects (see [docs/auth-cookie-forwarding.md](docs/auth-cookie-forwarding.md))

## Available Scripts

### Development
- `bun dev` - Start development server with hot reload
- `bun build` - Build for production
- `bun preview` - Preview production build locally

### Database Management
- `bun ba:generate` - Generate Better Auth schema
- `bun db:generate` - Generate Drizzle migrations
- `bun db:studio` - Open Drizzle Studio GUI
- `bun migrate:dev` - Apply migrations locally
- `bun migrate:prd` - Apply migrations to production
- `bun migrate:new` - Generate both auth schema and migrations

### Deployment
- `bun release` - Full production deployment (migrations + build + deploy)
- `bun worker:run <file>` - Run scripts in worker context
- `bun seed` - Seed database with initial data

### Utilities
- `bun clean` - Clean build artifacts
- `bun types` - Type check the project
- `bun check` - Run all checks

## Project Structure

```
src/
├── worker.tsx           # Main entry point, routes, middleware
├── db/
│   ├── index.ts        # Database connection
│   ├── schema.ts       # Your app schemas
│   └── auth-schema.ts  # Generated auth tables
├── lib/
│   └── auth.ts         # Better Auth configuration
├── app/
│   ├── pages/          # Page components
│   │   └── user/
│   │       ├── Login.tsx     # Login UI component
│   │       ├── functions.ts  # Server actions
│   │       └── routes.ts     # User routes
│   ├── components/     # Reusable UI components
│   ├── interruptors.ts # Route middleware/guards
│   └── Document.tsx    # HTML document wrapper
├── scripts/            # Utility scripts
└── migrations/         # Database migrations (generated)

docs/
├── auth-cookie-forwarding.md  # Cookie handling guide
├── validation-guide.md         # Zod validation patterns
└── adr/
    └── 001-validation-with-zod.md  # Decision record
```

## Common Patterns

### Protected Routes

Use interruptors to protect routes:

```typescript
// src/worker.tsx
route("/protected", [requireAuth, MyProtectedPage])
```

### Server Actions with Cookies

```typescript
"use server";
import { requestInfo } from "rwsdk/worker";

export async function myAction() {
  const { request, response } = requestInfo;
  
  // Set cookies via response.headers
  response.headers.set('Set-Cookie', 'token=value; Path=/');
  
  // Return plain objects (not Response)
  return { success: true };
}
```

### Server Actions with Validation

```typescript
"use server";
import { z } from 'zod';
import { validate } from '@/lib/validation';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

export async function createUser(data: unknown) {
  // Validate input
  const validation = validate(schema, data);
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }
  
  // Use validated, typed data
  const { email, name } = validation.data;
  
  // Your logic here...
  return { success: true, user: { email, name } };
}
```

### Database Queries

```typescript
import { db } from "@/db";
import { user } from "@/db/schema";

// Query with Drizzle
const allUsers = await db.select().from(user);
```

## Troubleshooting

### Session/Cookie Issues
- Ensure `BETTER_AUTH_SECRET` is set
- Check `BA_TRUSTED_ORIGINS` includes your domain
- See [docs/auth-cookie-forwarding.md](docs/auth-cookie-forwarding.md) for server action cookie handling

### Validation Issues
- Check schema definitions match your data structure
- Use `safeParse` for debugging validation errors
- See [docs/validation-guide.md](docs/validation-guide.md) for patterns and examples

### Database Issues
- Run `bun migrate:dev` after schema changes
- Use `bun db:studio` to inspect data
- Check D1 binding in `wrangler.jsonc`

### Build/Deploy Issues
- Clear cache with `bun clean`
- Ensure all env vars are set in Cloudflare dashboard
- Check wrangler logs: `wrangler tail`

## Resources

- [RWSDK Documentation](https://docs.rwsdk.com/)
- [Better Auth Docs](https://better-auth.com/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/runtime-apis/secrets/)