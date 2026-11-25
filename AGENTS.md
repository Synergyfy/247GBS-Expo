# 247GBS-Expo — AI Workspace Context & Agent Guide

This document captures the platform architecture, project conventions, and critical UI/UX rules established for the **247GBS Digital Expo** application.

---

## 1. Project Overview & Active Environments
- **Repository**: `247GBS-Expo` (`Synergyfy/247GBS-Expo`)
- **Framework**: Next.js 16 (App Router, Turbopack, React 19) + Tailwind CSS + Lucide React
- **Active Feature Branch**: `feat/mobile-responsive-public-pages`
- **Deployment & Production Branches**:
  - `main` (Live production deployment)
  - `dev` (Development / staging deployment)
- **Deployment Process**: Features are built and tested on `feat/mobile-responsive-public-pages`. Once verified, PRs are created and merged into `main` and `dev` using `gh pr create` and `gh pr merge`.

### 1.1 Monorepo Layout (npm workspaces)
- Single git repository containing two workspaces:
  - `apps/web` — Next.js frontend (`247_digital_expo`).
  - `apps/backend` — NestJS API (`247GBS-ExpoBackend`, Prisma + PostgreSQL).
- Root `package.json` defines `workspaces: ["apps/*"]` and a single root `package-lock.json`.
- Run installs once at the repo root: `npm install`.
- Common root scripts:
  - `npm run dev` / `npm run dev:web` — start the web app.
  - `npm run dev:backend` — start the NestJS API in watch mode.
  - `npm run build` builds both workspaces; `npm run build:web` and `npm run build:backend` build one.
  - `npm run typecheck`, `npm run lint`, `npm run lint:backend`, `npm run test:backend`.
  - `npm run prisma:generate` regenerates the Prisma client; `npm install` runs it automatically via `postinstall`.
- Workspace commands can also be run directly, e.g. `npm run dev -w apps/web`.
- `apps/web/next.config.ts` pins both `turbopack.root` and `outputFileTracingRoot` to the repository root so hoisted dependencies resolve correctly. Do not remove these settings when moving the app.
- Legacy note: `apps/web/init` is the process bootstrap (`node init && next dev`); it only creates a `.tmp` directory. Keep it and `apps/web/postcss.config.mjs` free of obfuscated or dynamically-evaluated code.

---

## 2. Core Architecture & Feature Specifications

### 2.1 Events & Ticket Templates System
- **Centralized Admin Location**: `/dashboard/admin/events/templates`
  - Accessible via the **"Ticket Templates"** button in the Events Directory (`/dashboard/admin/events`).
  - Removed from System Configuration (`/dashboard/admin/configuration` — no "Policy & Templates" tab) and Platform Governance (`/dashboard/admin/governance` — no "Ticket Templates" tab).
- **Template Creation & Editing**: Dedicated full-screen page at `/dashboard/admin/events/templates/create` (also supports `?edit=[id]`).
- **Template Data Store**: `apps/web/src/data/ticketTemplates.ts`
  - Synchronizes across tabs and sessions via `localStorage` (`STORAGE_KEY_TEMPLATES = "admin_global_ticket_templates_v2"`) and custom event `"ticket_templates_changed"`.
  - Default presets:
    1. *Standard Season Day Pass Template* (Access: `General`, Cap: `£0 – £50`, Split: `10% Platform Split`)
    2. *VIP Executive Workshop Template* (Access: `Full Hall + Lounge`, Cap: `£50 – £250`, Split: `8% Platform Split`)
    3. *Platform-Sponsored Complimentary Pass* (Access: `Specific Booth`, Cap: `Free (£0 Cap)`, Split: `0% Fee • Platform Funded`)
- **Event Creation Integration**:
  - Both **Admin Event Creation** (`/dashboard/admin/events/create`) and **Business Event Creation** (`/dashboard/business/events/create`) dynamically import active templates from `getStoredTicketTemplates()`.
  - Event organizers are bound to select an approved template; ticket price is strictly capped to `[minPrice, maxPrice]`.

### 2.2 Event Types (Consolidation)
- **Unified Event Types**: Formerly split into separate "Category" and "Sub-Category" dropdowns. Now consolidated into a single platform-wide **`Event Type`**.
- **Admin Management**: On `/dashboard/admin/events/templates`, under the **Event Type** section.
- **Data Store**: `apps/web/src/data/categories.ts` (`STORAGE_KEY_TYPES = "admin_event_types_v3"`).
- **Default Types**:
  - `Workshop`
  - `Demonstration`
  - `Seller Training`
  - `Keynote Showcase`
  - `Product Launch`
  - `Networking Session`

### 2.3 Business Booth in Admin Context
- When an admin inspects a registered business in `/dashboard/admin/businesses`, clicking **"View Booth"** navigates to `/dashboard/admin/businesses/[id]/booth`.
- Renders the full interactive booth in the **Admin account context** with a persistent top navigation bar: `← Back to Registered Businesses`. Admin navigation remains active without redirecting to customer portal.
- **Removed from Admin Navigation**:
  - `Global Reporting`
  - `Compliance` & `Audit` (consolidated/streamlined)

### 2.4 Dispute Resolution Center
- Dispute cases open on a dedicated detail page (`/dashboard/admin/disputes/[id]`) rather than popup modals.
- Includes evidence timeline, red flags analysis, and interactive arbitration ruling workflows.

---

## 3. Strict UI / UX Craft Rules (User Directives)

### ❌ Never Do:
1. **NO Nested Backgrounds / Double Boxes:**
   - Never wrap an inner card or field in a tinted background container (e.g. no `bg-orange-50` box wrapping a `bg-white` card; no bulky gray box wrapper around radio options; no heavy blue alert box around conditional messages).
   - Keep form controls and preview cards flat, clean, and native.
2. **NO Verbose / Over-Explained Button Labels:**
   - Keep button text short, punchy, and direct.
   - Example: Use **`Delete`** (never `Yes, Delete Template`).
   - Example: Use **`Next`**, **`Continue`**, **`Back`**, **`Cancel`**.
3. **NO Multi-Line Pill / Badge Wrapping:**
   - Badges (e.g. `GLOBAL PRESET`, `ACTIVE`) must ALWAYS have `whitespace-nowrap shrink-0`.
   - Never let badges squash into multiple lines or collide with card borders.
   - Headers with trailing badges should use responsive flex (`flex flex-col sm:flex-row sm:items-center justify-between gap-2`).
4. **NO Overly Tall Cards:**
   - Keep card heights compact with balanced padding (`p-3.5 sm:p-4`, not `p-6`).
   - Keep icon containers compact (`w-6 h-6`).
   - Clamp long descriptions to 1 or 2 lines (`line-clamp-1` / `line-clamp-2`).
5. **NO Left-Floating Auxiliary Badges Squeezing Headers:**
   - Section headers must provide 100% horizontal breathing room for titles.

### ✅ Always Do:
- **Confirmation Modals on Destructive Actions**: Deleting cards, templates, or resources must trigger a clean confirmation dialog with `Cancel` and `Delete`.
- **Inline Inputs without Wrappers**: Adding items (like new categories/types) should use a clean inline form directly below the header toggle without colored container boxes.
- **Real-time Cross-Module Synchronization**: Use `localStorage` + `window.dispatchEvent(new CustomEvent(...))` to keep admin configuration in sync with creation wizards.

---

## 4. Build, Verification & Tooling
- Always run TypeScript and build verification prior to committing:
  ```bash
  npm run typecheck && npm run build
  ```
- *Note*: Turbopack font optimization connects to Google Fonts during build; commands executing builds or network operations must run unsandboxed (`BypassSandbox: true`).
