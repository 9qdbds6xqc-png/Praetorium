# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a2475abe-ad06-4fab-8055-c980636970b3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a2475abe-ad06-4fab-8055-c980636970b3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project is automatically deployed to GitHub Pages via GitHub Actions on every push to the `main` branch.

The site is live at: **https://www.praetorium.tech**

## Custom Domain

The custom domain `www.praetorium.tech` is configured via the `CNAME` file in the `public/` directory.

## Conversational Assistant

- `/` keeps the minimalist landing page and links to the chat.
- `/chat` now lets the user paste any public website link; the assistant fetches the page text (via the KI-Vergabe backend) and answers strictly from that content.

The backlog endpoint is still shared with the KI-Vergabe deployment, so conversations continue to be stored centrally. No upload/admin screen exists in this repo.

### Environment Variables

Copy `.env.example` to `.env` and (re)use the KI-Vergabe values:

| Variable | Description | Suggested value |
| --- | --- | --- |
| `VITE_OPENAI_API_KEY` | OpenAI key used for the chat completions. | `<same key as KI-Vergabe>` |
| `VITE_AUTH_API_URL` | Existing password API endpoint. | `https://trafosanf-remake.vercel.app/api/auth` |
| `VITE_BACKLOG_API_URL` | Endpoint that records conversations. | `https://trafosanf-remake.vercel.app/api/backlog` |
| `VITE_COMPANY_DOCS_API_URL` | Endpoint that proxies website/PDF content. | `https://trafosanf-remake.vercel.app/api/company-docs` |
| `VITE_ADMIN_TOKEN_SALT` | Same salt as the KI project (used only for compatibility). | `ki-vergabe-admin-token` |
| `VITE_CHAT_API_URL` | Server-side proxy that talks to OpenAI. | `https://trafosanf-remake.vercel.app/api/openai` |
 
With those values in place no additional Supabase setup is required—the assistant relies on the existing KI-Vergabe infrastructure and simply streams user-provided website content through it.
