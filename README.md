# Kamkimat Website

Premium multi-page marketing website for Kamkimat, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, and a GitHub-backed admin content editor.

## Run locally

Configure `.env` first:

```bash
ADMIN_USERNAME="kamkimat-admin"
ADMIN_PASSWORD="replace-this-with-a-strong-password"
ADMIN_SESSION_SECRET="replace-this-with-a-long-random-secret"
GITHUB_TOKEN="github_pat_replace_me"
GITHUB_OWNER="your-github-username-or-org"
GITHUB_REPO="your-repo-name"
GITHUB_BRANCH="main"
CONTENT_FILE_PATH="data/content.json"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="kamkimat67@gmail.com"
SMTP_PASS="replace-this-with-your-gmail-app-password"
SMTP_FROM="Kamkimat <kamkimat67@gmail.com>"
USE_OPENAI="false"
```

Then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Admin panel

- Admin login URL: `/admin/login`
- The admin dashboard reads content from GitHub first and falls back to [content.json](D:/kam%20%20kimat%2055/data/content.json)
- Saving in `/admin` commits the updated `data/content.json` file back to your GitHub repo
- The admin dashboard edits:
  - contact details
  - homepage text
  - about page content
  - services page content

## Contact handling

- The contact form posts to `/api/contact`
- The chatbot lead form posts to `/api/chatbot/lead`
- Both send email with Nodemailer through Gmail SMTP
- All submissions go to `kamkimat67@gmail.com`

## Production build

```bash
npm install
npm run build
npm run start
```

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Nodemailer
- Secure admin auth with HTTP-only session cookies
- GitHub-backed content persistence
- Local `data/content.json` fallback content

## Notes

- The founder section is static and not editable from the admin panel.
- The chatbot keeps the rule-based mode by default. Set `USE_OPENAI=true` and add `OPENAI_API_KEY` only if you want to re-enable the OpenAI route later.
- For production persistence on Vercel, set the GitHub env vars so `/api/admin/content` can commit updates back to your repo.
- If GitHub read access fails, the site falls back to the local `data/content.json` file bundled with the deployment.
