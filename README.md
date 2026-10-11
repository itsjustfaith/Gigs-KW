# Gigs

Gigs is a local freelance marketplace platform tailored for Kuwait. It connects clients with independent talent across design, development, writing and translation, marketing, video editing, tutoring, and consulting.

The current project is a bilingual English and Arabic product preview. It includes a landing page, a sample freelancer directory and profiles, and a local project brief preview. The sample profiles and prices are illustrative; project briefs are not sent or saved.


<img width="815" height="645" alt="image" src="https://github.com/user-attachments/assets/77954333-0669-404a-a515-20d4273dc991" />
<img width="842" height="665" alt="image" src="https://github.com/user-attachments/assets/bcdd6253-93e7-474c-8a65-ac99f4ed0111" />
<img width="767" height="732" alt="image" src="https://github.com/user-attachments/assets/465cefdb-654b-4f94-be54-7ca72db50689" />
<img width="587" height="517" alt="image" src="https://github.com/user-attachments/assets/feba4a44-90d6-4388-9ee2-455bf5f9d2b9" />


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
