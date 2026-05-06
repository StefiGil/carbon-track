# CLAUDE.md — Carbon Track App

## Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- PostgreSQL (Docker) + Prisma 7 ORM
- Recharts for charts
- npm as package manager

## Project Structure
```
carbon-track-app/
├─ app/
│  ├─ page.tsx               # Analysis page (main)
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ components/            # UI components
│  │  └─ home/               # Components specific to the main page
│  └─ api/                   # API routes (backend)
├─ lib/
│  └─ prisma.ts              # Prisma client singleton
├─ prisma/
│  ├─ schema.prisma
│  ├─ seed.ts
│  └─ migrations/
├─ designs/                  # UI reference screenshots from Stitch (do not edit)
├─ docs/                     # Documentation and diagrams
├─ public/                   # Static assets
├─ prisma.config.ts
├─ docker-compose.yml
├─ CLAUDE.md
└─ AGENTS.md
```

## Pages (build one at a time, in this order)
1. **Analysis** (`app/page.tsx`) — upload Excel files + configure analysis + generate
2. **Results** (`app/results/page.tsx`) — charts, tables, export PDF
3. **Guide** (`app/guide/page.tsx`) — how to prepare and upload data
4. **About** (`app/about/page.tsx`) — project info

## Frontend Conventions
- All data comes from the API — never hardcode values, labels, or lists
- Components go in `app/components/` — page-specific ones in a subfolder (e.g. `home/`)
- While data is loading, always show a loading state
- If the API fails, show a clear error message
- Always check `/designs` before building a page

## Code Conventions
- Code and comments in English
- Nunca agregues emojies al codigo