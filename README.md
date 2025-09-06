## Road to Next – Ticket Management System

A full‑stack Ticket Management app built with Next.js App Router, Prisma, PostgreSQL, and Lucia authentication. It includes sign up/in, ticket CRUD, status management, theming, and a small component library.

### Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Auth**: Lucia 3 with Prisma adapter, Argon2 password hashing
- **Database**: PostgreSQL + Prisma ORM
- **UI**: Tailwind CSS, Radix UI primitives, custom components
- **Validation & Utils**: Zod, date-fns, big.js, sonner

## Getting Started

### Prerequisites

- **Node.js** 18.18+ (Node 20+ recommended)
- **PostgreSQL** database and connection URL

### 1) Install dependencies

```bash
npm install
```

### 2) Environment variables

Create a `.env` at the project root:

```bash
# PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
```

### 3) Database setup

Generate the Prisma client (also runs automatically on postinstall):

```bash
npx prisma generate
```

Create/update the database schema (choose one):

```bash
# Option A: create tables based on current schema
npx prisma db push

# Option B: create a migration (recommended for teams)
npx prisma migrate dev --name init
```

Seed initial data (users and tickets):

```bash
npm run prisma-seed
```

### 4) Start the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Seeded Accounts

Two users are created by `prisma/seed.ts` with the same password:

You can change these in `prisma/seed.ts`.

## Project Scripts

- **dev**: Run Next.js in development
- **build**: Build for production
- **start**: Start the production server
- **lint**: Lint the codebase
- **lint-fix**: Lint with auto‑fix
- **type**: Type‑check with `tsc`
- **prisma-seed**: Run the Prisma seed script
- **docs:update**: Update generated docs (`PROJECT_DOCUMENTATION.md`)
- **hooks:install**: Install a simple pre‑commit hook to run docs update

Run any script with `npm run <script>`.

## Key Features

- **Authentication**: Lucia 3 + Prisma adapter, session cookies, Argon2 hashing
- **Tickets**: Create, edit, delete, update status (`OPEN`, `IN_PROGRESS`, `CLOSED`)
- **Forms & Validation**: Zod‑based validation with reusable form components
- **UI/UX**: Tailwind CSS, Radix UI, light/dark theme toggle
- **Data Access**: Prisma Client with a shared singleton

## Important Paths

- `prisma/schema.prisma`: Database models (User, Session, Ticket)
- `prisma/seed.ts`: Seed users and tickets
- `src/lib/prisma.ts`: Prisma Client singleton
- `src/lib/lucia.ts`: Lucia auth configuration
- `src/features/auth/*`: Auth actions, components, hooks
- `src/features/ticket/*`: Ticket actions, components, queries
- `src/app/*`: App Router pages and templates

## Common Tasks

```bash
# Inspect your database in a browser
npx prisma studio

# Update Prisma client after schema changes
npx prisma generate

# Re-seed database (will clear and repopulate seed data)
npm run prisma-seed
```

## Deployment Notes

- Set `DATABASE_URL` (and `DIRECT_URL` if used) in your hosting environment
- Ensure `NODE_ENV=production` for secure cookies in Lucia configuration
- Build with `npm run build` and start with `npm run start`

## License

This project is provided without a specific license. Add one if you intend to distribute.
