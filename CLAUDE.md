# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

Prisma commands:
```bash
npx prisma migrate dev   # Run migrations in development
npx prisma studio        # Open Prisma Studio (DB browser)
npx prisma generate      # Regenerate Prisma client after schema changes
```

## Architecture

This is a **Next.js 15 App Router** full-stack real estate platform for Jalisco, Mexico. All routing uses the App Router convention (`src/app/`).

### Stack
- **Next.js 15** + **React 19** + **TypeScript** (strict mode)
- **Tailwind CSS 4** for styling
- **Prisma 7** + **PostgreSQL** via `@prisma/adapter-pg`
- **Leaflet** / **react-leaflet** for property maps
- Path alias: `@/*` → `src/*`

### Database

Single `properties` table defined in [prisma/schema.prisma](prisma/schema.prisma). Key fields:
- `type`: enum (`casa`, `departamento`, `terreno`, `casa_en_condominio`, `local`, `bodega`, `duplex`)
- `status`: enum (`venta`, `renta`)
- `county`: Jalisco municipality name
- `gallery`: `String[]` (PostgreSQL array of image URLs)
- `active`: soft-delete flag (false = deleted)
- `lat`/`lng`: coordinates for Leaflet map

The Prisma singleton is at [src/lib/prisma.ts](src/lib/prisma.ts). Always import from there — do not instantiate `PrismaClient` directly.

Environment variable required: `DATABASE_URL` (see `.env`).

### API Routes

REST endpoints under `src/app/api/properties/`:
- `GET /api/properties` — list active properties; supports query params `county`, `status`, `type`, `bedrooms`, `parking` (comma-separated for multi-select)
- `POST /api/properties` — create property
- `GET /api/properties/[id]` — single property
- `PUT /api/properties/[id]` — update property
- `DELETE /api/properties/[id]` — soft-delete (`active = false`)

### App Routes

| Route | Description |
|-------|-------------|
| `/` | Home: hero, recommended properties, social media, contact overlay |
| `/propiedades` | Listing page with multi-filter sidebar |
| `/propiedad/[id]` | Property detail: gallery, map, contact form |
| `/nosotros` | About/team page |

### Shared Types & Data

[src/data/properties.ts](src/data/properties.ts) exports:
- `Property` interface (mirrors DB schema)
- `PropertyType` union type
- `propertyTypeLabels` map (type → Spanish label)
- `municipiosJalisco` array (the 15 supported municipalities)

These are used across both client components and API routes.

### Components

[src/components/](src/components/) contains all shared UI. Key patterns:
- `PropertyMap.tsx` and `PropertyMapWrapper.tsx` use Leaflet, which is client-side only — always render via the wrapper with `'use client'` and dynamic imports to avoid SSR errors.
- `MultiSelect.tsx` is the custom dropdown used for filter fields on `/propiedades`.
- `ContactOverlay.tsx` is a global modal triggered from `Navbar.tsx`.
