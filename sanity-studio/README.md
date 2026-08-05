# Earthlink Sanity Studio

A ready-to-run Sanity Studio for editing the Earthlink Consultants website
content (Universities, Countries, Blog Posts, Authors).

- **Project ID:** `yyunt6ld`
- **Dataset:** `production`

## Run it locally

```bash
cd sanity-studio
npm install
npm run dev          # http://localhost:3333
```

## Deploy the hosted Studio (one-time)

```bash
npx sanity login              # opens browser
npm run deploy                # pick a hostname → https://<name>.sanity.studio
```

## CORS — required so the live site can read content

Go to https://sanity.io/manage → project **yyunt6ld** → **API → CORS origins**
and add (no credentials):

- `http://localhost:5173`
- `http://localhost:8080`
- your Lovable preview URL
- your production domain

## Content in this dataset (seeded from the site's built-in content)

- 8 featured destination groups, 92 fallback universities, 39 blog posts, 1 author — all with cover images.
- Re-run the seed at any time with:
  ```bash
  SANITY_WRITE_TOKEN=<token> bun run scripts/seed-sanity.ts
  ```
  It's idempotent — deterministic `_id`s upsert instead of duplicating.
  **Rotate the token** at sanity.io/manage → API → Tokens after seeding
  and after any chat-shared token exposure.

## Schema files

Live under `sanity-studio/schemaTypes/` and are already registered:
`post`, `author`, `country`, `university`, `blockContent`.

## Security note

The public site uses only `projectId` + `dataset` — never a token. Never
put a Sanity API token in `VITE_*` env vars or the frontend bundle.
