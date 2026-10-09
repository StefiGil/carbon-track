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
│  ├─ prisma.ts              # Prisma client singleton
│  └─ data/                  # Static UI copy and display metadata (about/, activities.ts)
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
1. **Analysis** (`app/analysis/page.tsx`) — upload Excel files + configure analysis + generate
2. **Results** (`app/results/page.tsx`) — charts, tables, export PDF
3. **Home** (`app/page.tsx`) — guide: what the app does and how to prepare and upload data
4. **About** (`app/about/page.tsx`) — project info

## Frontend Conventions
- All data comes from the API — never hardcode values, labels, or lists
- Components go in `app/components/` — page-specific ones in a subfolder (e.g. `home/`)
- While data is loading, always show a loading state
- If the API fails, show a clear error message
- Always check `/designs` before building a page

## Methodology
- Read `docs/metodologia-huella-de-carbono.md` before touching calculations, emission factors, units, or the About page
- Emission factors live in the database; users never enter them

## Reglas de trabajo
- Nunca hagas cambios (editar, crear o borrar archivos, commits, migraciones) sin autorizacion explicita de la usuaria
- Si algo se puede responder o explicar en el chat, hacelo ahi
- Proponer cambios es el ultimo recurso: describilos en el chat y esperá aprobacion antes de aplicarlos

## Code Conventions
- Code and comments in English
- Nunca agregues emojies al codigo

## Auth (última feature)
- Login es la última feature a implementar
- Sin login, múltiples usuarios compartirían la misma DB y se pisarían los cálculos
- Reports (`/reports`) está comentado en el header hasta que exista autenticación
- Una vez con login: los usuarios pueden guardar sus análisis y ver sus reportes históricos
- El header muestra "Sign in" cuando no hay sesión activa
