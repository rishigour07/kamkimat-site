# Kamkimat Website

Premium multi-page marketing website for Kamkimat, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

## Run locally

Set both `DATABASE_URL` and `DIRECT_URL` before running the app.

```bash
npm install
npm run db:init
npm run admin:create -- admin@kamkimat.com your-password
npm run dev
```

Open `http://localhost:3000`.

## Remote Supabase setup without manual SQL

1. Add the Supabase connection strings to `.env`:

```bash
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?sslmode=require"
```

Use the Supabase transaction pooler on port `6543` for `DATABASE_URL` and the Session Pooler on port `5432` for `DIRECT_URL`. If your local machine can reach the direct database host over IPv6, you can swap `DIRECT_URL` to the direct `db.[PROJECT-REF].supabase.co:5432` string instead.

2. Initialize the remote database from the existing Prisma migrations:

```bash
npm install
npm run db:init
```

This runs `prisma migrate deploy` and then `prisma generate`, so it creates the remote `admin_users`, `founders`, and `contact_submissions` tables without needing to paste SQL into the Supabase dashboard.

If you need a schema-only sync instead of migrations, you can use:

```bash
npm run db:push
```

After the database is ready, create the first admin user:

```bash
npm run admin:create -- admin@kamkimat.com your-strong-password
```

## Production build

```bash
npm run build
npm run start
```

## Production setup

```bash
npm install
npm run db:init
npm run admin:create -- admin@kamkimat.com your-strong-password
npm run build
```

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Prisma ORM
- Supabase PostgreSQL
- Secure admin auth with HTTP-only session cookies

## Notes

- The contact form and chatbot lead form both store submissions in Supabase PostgreSQL through Prisma.
- Founder content is managed from the `/admin` panel and rendered dynamically on the public About page.
- The chatbot uses the `/api/chatbot` route with a `USE_OPENAI` feature flag. Keep `USE_OPENAI=false` for the built-in rule-based assistant, or switch it to `true` after adding `OPENAI_API_KEY`.
- Set `DATABASE_URL`, `DIRECT_URL`, and `ADMIN_SESSION_SECRET` in production before deploying.
- `OPENAI_API_KEY` and `OPENAI_CHAT_MODEL` are optional unless `USE_OPENAI=true`.
- The portfolio content is written as representative case-study style marketing content and can be replaced with real client work later.
- The project is now aligned with a Vercel-compatible serverless deployment model by using Supabase PostgreSQL instead of a local SQLite file.
