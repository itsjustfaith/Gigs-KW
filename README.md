# Gigs

Gigs is a local freelance marketplace platform tailored for Kuwait. It connects clients with independent talent across design, development, writing and translation, marketing, video editing, tutoring, and consulting.

The current project is a bilingual English and Arabic product preview. It includes a landing page, a sample freelancer directory and profiles, and a local project brief preview. The sample profiles and prices are illustrative; project briefs are not sent or saved.

## Tech stack

- **Next.js 16** with the App Router
- **React 19** and **TypeScript 5**
- **Tailwind CSS 4** via the Tailwind PostCSS plugin
- **Instrument Sans** and **IBM Plex Sans Arabic** self-hosted from Fontsource
- **npm** for dependency management

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). English and Arabic pages are available at `/en` and `/ar`.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server on `127.0.0.1:3000` |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build locally |

## Current scope

The freelancer directory and profiles use development-only sample data. The project brief form is a local preview and does not submit or store information. Marketplace accounts, messaging, project submission, payments, and backend services are not implemented yet.
