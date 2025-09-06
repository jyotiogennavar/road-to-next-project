## Road-to-Next – Project Documentation

This document explains the project architecture, folder/file layout, database schema, authentication, cookies, hooks, and core features to help you recreate or extend a similar app.

### Tech Stack
- Next.js App Router (React 19, Next 15)
- TypeScript
- Prisma ORM with PostgreSQL
- Lucia Auth with Prisma adapter
- Argon2 password hashing (`@node-rs/argon2`)
- Tailwind CSS + shadcn/radix UI primitives
- Zod for validation
- Sonner for toasts

---

## Folder and File Structure

Top-level files:
- `package.json` – scripts and dependencies
- `prisma/schema.prisma` – DB schema; `prisma/seed.ts` – seed data
- `src/` – application code
- `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs` – tooling

Key app structure under `src/`:

```
src/
  actions/
    cookies.ts
  app/
    layout.tsx
    page.tsx
    password-forgot/page.tsx
    sign-in/page.tsx
    sign-up/page.tsx
    tickets/
      page.tsx
      [ticketId]/
        page.tsx
        edit/page.tsx
        error.tsx
        loading.tsx
        not-found.tsx
  components/
    Header.tsx
    Navbar.tsx
    PlaceHolder.tsx
    redirect-toast.tsx
    spinner.tsx
    confirm-dialog.tsx
    date-picker.tsx
    form/
      field-error.tsx
      form.tsx
      hooks/use-action-feedback.tsx
      submit-button.tsx
      utils/to-action-state.ts
    theme/
      theme-provider.tsx
      theme-switcher.tsx
    ui/ ... (button, input, card, dropdown, etc.)
  features/
    auth/
      actions/ (sign-in.ts, sign-out.ts, sign-up.ts)
      components/ (sign-in-form.tsx, sign-up-form.tsx)
      hooks/ (use-auth.ts)
      queries/ (get-auth.ts)
    ticket/
      actions/ (upsert-ticket.ts, delete-ticket.tsx, update-ticket-status.ts)
      components/ (ticket-item.tsx, ticket-list.tsx, ticket-more-menu.tsx, ticket-upsert-form.tsx)
      queries/ (get-ticket.ts, get-tickets.ts)
      constants.tsx
  lib/
    prisma.ts
    lucia.ts
    big.ts
    utils.ts
  utils/
    currency.ts
  path.ts
```

Notes:
- App Router collocates routes in `src/app`. Server Components by default; client components use "use client".
- Feature directories group actions, components, hooks, and queries.

---

## Database Setup (Prisma + PostgreSQL)

`prisma/schema.prisma` defines three models:
- `User`: `id`, `username` (unique), `email` (unique), `passwordHash`, relation `sessions`
- `Session`: `id`, `expiresAt`, `userId` → `User` (cascade on delete), index on `userId`
- `Ticket`: `id`, timestamps, `title`, `content` (varchar 1024), `status` (enum `OPEN | IN_PROGRESS | CLOSED`), `deadline` (ISO date string), `bounty` (Int cents)

Datasource:
- Provider: `postgresql`
- `DATABASE_URL` and `DIRECT_URL` env vars required.

Generation and seeding:
- Postinstall runs `prisma generate`.
- Seed command: `npm run prisma-seed` executes `prisma/seed.ts` to reset and insert sample tickets.

Prisma client singleton (`src/lib/prisma.ts`):
- Creates/global-caches a single `PrismaClient` across hot reloads. Use `import { prisma } from "@/lib/prisma"` in server code.

Monetary values:
- Store `bounty` as Int in cents. Use helpers in `src/utils/currency.ts`.

---

## Authentication (Lucia + Prisma)

Lucia config (`src/lib/lucia.ts`):
- Adapter: `@lucia-auth/adapter-prisma` wired with `prisma.session` and `prisma.user`.
- Session cookie: non-expiring by default (`expires: false`), `secure` in production.
- `getUserAttributes` maps `username` and `email` onto the auth user object.

Auth queries:
- `get-auth.ts` reads session ID from cookies via `lucia.sessionCookieName`, validates the session, and refreshes/clears the cookie based on state. Wrapped in `react` `cache` for RSC efficiency. Returns `{ user, session }`.

Auth actions:
- `sign-up.ts`
  - Validates with Zod (username/email/password/confirmPassword, match enforced in `superRefine`).
  - Hashes password using Argon2 (`hash`).
  - Creates user in Prisma (`prisma.user.create`).
  - Creates a Lucia session and sets the session cookie via `next/headers` `cookies()`.
  - Redirects to tickets page.
- `sign-in.ts`
  - Validates with Zod.
  - Looks up user by email. Verifies password with Argon2 `verify`.
  - Creates session + session cookie; redirects to tickets.
  - Returns structured `ActionState` errors on failure.
- `sign-out.ts`
  - Reads current session via `getAuth`.
  - Invalidates session in Lucia.
  - Sets a blank session cookie and redirects to sign-in.

Client integration:
- `use-auth.ts` client hook fetches `{ user }` using `getAuth()` when pathname changes, exposing `{ user, isFetched }`.
- `Navbar.tsx` renders different nav items based on `user` and submits a `<form action={signOut}>` for logout.

---

## Cookies

Server cookie helpers (`src/actions/cookies.ts`):
- `getCookieByKey(key)` – returns cookie value or null.
- `setCookieByKey(key, value)` – sets a cookie.
- `deleteCookieByKey(key)` – deletes a cookie.

Redirect toast (`src/components/redirect-toast.tsx`):
- On route changes, reads the `toast` cookie; if present, shows `sonner` toast and deletes cookie. Useful for surfacing success messages after server redirects.

Tickets actions use cookies for UX:
- `upsert-ticket.ts`: sets `toast` cookie to "Ticket updated" before redirecting to detail.
- `delete-ticket.tsx`: sets `toast` cookie to "Ticket deleted" before redirecting.

---

## Shared Forms, Hooks, and Utilities

ActionState utilities (`src/components/form/utils/to-action-state.ts`):
- Defines `ActionState` shape and helpers:
  - `fromErrorToActionState(error, formData?)` – maps Zod errors and generic errors into actionable UI state.
  - `toActionState(status, message, formData?)` – creates success/error payloads.

Form component (`src/components/form/form.tsx`):
- Wraps native `<form>` with toast feedback via `useActionFeedback`.
- Calls optional `onSuccess`/`onError` callbacks.

Submit button (`src/components/form/submit-button.tsx`):
- Uses `useFormStatus()` to show pending spinner and disable during submissions.

Field error (`src/components/form/field-error.tsx`):
- Renders the first Zod field error for a given input name.

`use-action-feedback` hook:
- Detects `ActionState` timestamp changes and triggers success/error callbacks and logs.

Date picker (`src/components/date-picker.tsx`):
- Client popover calendar with hidden input (yyyy-MM-dd). Supports `imperativeHandleRef.reset()`.

Currency utilities (`src/utils/currency.ts` + `src/lib/big.ts`):
- `toCent`, `fromCent`, and `toCurrencyFromCent` using `big.js`. Defaults: 2 decimal places, banker’s rounding.

Misc utilities:
- `src/lib/utils.ts` exposes `cn` to merge class names with `tailwind-merge`.
- `src/path.ts` centralizes route path builders.

---

## Tickets Feature

Domain rules:
- Ticket has `title` (3–255), `content` (3–1024), `deadline` (yyyy-MM-dd string), `bounty` (positive number in dollars form at UI; converted to cents for DB).

Actions (server):
- `upsert-ticket.ts`
  - Validates with Zod. Converts `bounty` dollars → cents with `toCent`.
  - Uses `prisma.ticket.upsert` with either create or update by `id`.
  - Revalidates list page (`revalidatePath('/tickets')`).
  - On edit, sets `toast` = "Ticket updated" and redirects to detail. On create, returns success `ActionState` for in-place toast.
- `update-ticket-status.ts`
  - Updates `status` via `prisma.ticket.update`, revalidates list, returns success/error `ActionState`.
- `delete-ticket.tsx`
  - Deletes by `id`, revalidates, sets `toast` = "Ticket deleted", redirects to list.

Queries:
- `get-tickets.ts` – fetches tickets ordered by `createdAt desc`.
- `get-ticket.ts` – fetches one ticket by `id`.

Components:
- `ticket-upsert-form.tsx` (client)
  - Uses `useActionState` with bound `upsertTicket` (passing `ticket?.id` for updates).
  - Preserves field values via `ActionState.payload` on validation errors.
  - Resets date picker on success.
- `ticket-list.tsx` (server)
  - Suspense-friendly list rendering from `getTickets()`; each item uses `TicketItem`.
- `ticket-item.tsx` (server)
  - Displays ticket content, deadline, bounty (formatted), status icon.
  - Shows detail/edit buttons; in detail view, shows `TicketMoreMenu`.
- `ticket-more-menu.tsx` (client)
  - Dropdown with status radio group and destructive Delete (with confirm dialog).
  - Uses `toast.promise` while updating status and reflects `ActionState`.

Routes:
- `/tickets` – create form and list.
- `/tickets/[ticketId]` – detail page; `notFound()` if missing.
- `/tickets/[ticketId]/edit` – edit form.
- Route error/loading/not-found boundaries included per item route.

---

## App Layout, Routing, and Pages

Root layout (`src/app/layout.tsx`):
- Loads fonts, wraps with `ThemeProvider`, renders `Navbar` and main container, and mounts `Toaster`.

Pages:
- `/` (`page.tsx`) – landing with link to tickets.
- `/sign-in` and `/sign-up` – use `CardCompact` with respective forms.
- `/password-forgot` – placeholder page.

Navbar (`src/components/Navbar.tsx`):
- Client component using `useAuth()` to gate navigation.
- Authenticated: shows Tickets and Sign Out (form that posts to server action).
- Unauthenticated: shows Sign Up and Sign In.

---

## Setup and Run

Environment variables (example):
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
DIRECT_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
NODE_ENV=development
```

Commands:
- Install: `npm install`
- Generate Prisma client: `npx prisma generate` (auto on postinstall)
- Migrate: `npx prisma migrate dev --name init`
- Seed: `npm run prisma-seed`
- Dev server: `npm run dev`
- Build: `npm run build`; Start: `npm start`

Notes:
- Ensure PostgreSQL is running and `DATABASE_URL` is reachable.
- Use `prisma studio` (`npx prisma studio`) to inspect data.

---

## Authentication Flow Summary
1. Sign Up: validate → hash password → create user → create session → set cookie → redirect to `/tickets`.
2. Sign In: validate → find user → verify password → create session → set cookie → redirect to `/tickets`.
3. Sign Out: get session → invalidate → set blank cookie → redirect to `/sign-in`.
4. Session Read: `getAuth()` reads cookie, validates session, refreshes/clears cookie accordingly.

---

## Cookies Usage Summary
- Session cookie managed by Lucia (httpOnly via Next `cookies()` API).
- App-level `toast` cookie is a simple UX mechanism for cross-redirect notifications.

---

## Recreating a Similar Project
- Scaffold Next.js (App Router) with Tailwind and shadcn UI.
- Configure Prisma with PostgreSQL; define `User`, `Session`, `Ticket`.
- Wire Lucia with Prisma adapter; implement sign-up, sign-in, sign-out.
- Implement cookie helpers for UX toasts.
- Build tickets CRUD with server actions; validate with Zod; revalidate paths.
- Use client wrappers (`Form`, `SubmitButton`, `use-action-feedback`) for ergonomic submissions and toasts.

## Changelog

### feat: update Prisma schema to associate tickets with users; enhance ticket creation logic in seed script and upsert functionality to include user information (6898626)
- author: Jyoti Ogennavar <jyoti.ogennavar@xecurify.com>
- date: 2025-09-06T15:52:06+05:30
- files:
  - M PROJECT_DOCUMENTATION.md

### docs: update PROJECT_DOCUMENTATION.md to include changelog entries for Navbar enhancements, SubmitButton updates, and ThemeSwitcher improvements (8be40d6)
- author: Jyoti Ogennavar <jyoti.ogennavar@xecurify.com>
- date: 2025-09-01T09:43:45+05:30
- files:
  - M PROJECT_DOCUMENTATION.md
  - M package-lock.json
  - M package.json
  - M prisma/schema.prisma
  - M prisma/seed.ts
  - M src/features/ticket/actions/upsert-ticket.ts
  - M src/features/ticket/components/ticket-item.tsx
  - M src/features/ticket/queries/get-ticket.ts
  - M src/features/ticket/queries/get-tickets.ts

### feat: add project documentation and update scripts for automated changelog generation; enhance package.json with pre-commit hook and documentation update command (d5d89cb)
- author: Jyoti Ogennavar <jyoti.ogennavar@xecurify.com>
- date: 2025-09-01T09:43:21+05:30
- files:
  - M PROJECT_DOCUMENTATION.md

### feat: enhance Navbar with user authentication and sign-out functionality; update SubmitButton for icon support and variant options; improve ThemeSwitcher with mounted state handling (c04a632)
- author: Jyoti Ogennavar <jyoti.ogennavar@xecurify.com>
- date: 2025-08-23T12:46:19+05:30
- files:
  - A PROJECT_DOCUMENTATION.md
  - M package.json
  - A scripts/update-docs.js

### feat: enhance Navbar with user authentication and sign-out functionality; update SubmitButton for icon support and variant options; improve ThemeSwitcher with mounted state handling (c04a632)
- author: Jyoti Ogennavar <jyoti.ogennavar@xecurify.com>
- date: 2025-08-23T12:46:19+05:30
- files:
  - A PROJECT_DOCUMENTATION.md
  - M package.json
  - A scripts/update-docs.js
