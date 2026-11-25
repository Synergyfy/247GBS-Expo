# 247GBS Digital Expo

npm workspaces monorepo for the 247GBS Digital Expo platform.

| Workspace | Description | Stack |
| --- | --- | --- |
| `apps/web` | Public site and dashboards | Next.js 16 (App Router), React 19, Tailwind CSS |
| `apps/backend` | API service | NestJS 11, Prisma, PostgreSQL |

## Getting Started

Install dependencies once from the repository root. The `postinstall` step generates the Prisma client for `apps/backend`.

```bash
npm install
```

Create `apps/backend/.env` with your `DATABASE_URL` and any other backend secrets, then start both apps:

```bash
npm run dev:backend
npm run dev
```

The web app runs at [http://localhost:3000](http://localhost:3000).

## Root Scripts

| Command | Description |
| --- | --- |
| `npm run dev` / `npm run dev:web` | Start the web app |
| `npm run dev:backend` | Start the API in watch mode |
| `npm run build` | Build web and backend |
| `npm run build:web` / `npm run build:backend` | Build one workspace |
| `npm run typecheck` | Typecheck both workspaces |
| `npm run lint` / `npm run lint:backend` | Lint web / backend |
| `npm run test:backend` | Run backend unit tests |
| `npm run prisma:generate` | Regenerate the Prisma client |

Workspace scripts can also be run directly, for example `npm run dev -w apps/web` or `npm run prisma:generate -w apps/backend`.

## Deployment

Set the deployment root directory to `apps/web` for the frontend. Builds run from the monorepo root so workspace dependencies and `turbopack.root` resolve correctly.
