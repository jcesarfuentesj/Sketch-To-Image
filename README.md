# Overview

- Built off [T3 Stack](https://create.t3.gg/): TypeScript, Tailwind CS v3 with animate, Next.js v14, Prisma ORM, Postgres, tRPC, Shadcn UI
- `.cursorrules` setup
- eslint and prettier including many custom rules requiring certain imports and styling enforced by husky precommit linter
- docker-compose spins up local postgres database and temporal server for development
- Typescript script runner with env variables(run-script)
- declarative routing with zod, (@/utils/router/routes)
- Authentication and authorization service with Lucia
- lucide-react icons, react markdown with math and latex support, superjson for tRPC, react pdf
- react email welcome email, though no email provider setup
- openai with voyage embeddings

## Setup

- Install pnpm and have Docker running

```
pnpm install
```

- Rename `sample.env` to `.env` and add environment variables

## Running the app

1. Start up development database
2. Run Prisma Migrate, if needed
3. Start the app

```
pnpm run dev:services:up #1
pnpm prisma migrate dev #2
pnpm run dev #3
```

Go to http://localhost:3000/ to see the app.

## Deploying

Suggest you use vercel for deployment and neondb for postgres.

## Other

Run this command to cleanup the codebase or your commit will be rejected:

```
pnpm run format
pnpm prisma studio
```

Go to http://localhost:8233 to see temporal web ui.

### Adding new environment variables

Add to env.js and .env file.

### Dumping external db to local db

Edit db-init/init.sh with the correct password

### Todo next

- Add Sentry, add my component library, add posthog
- Move away from lucia auth, being deprecated: https://github.com/lucia-auth/lucia/discussions/1714
- Upgrade React, rn app router uses react v19 but pages uses v18 so could be confusing

**I deleted 'micro' and 'next-logger', it might matter**
