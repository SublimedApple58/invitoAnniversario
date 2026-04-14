# Invito Anniversario - Serena & Tiziano

## What was done

Full implementation of a wedding anniversary invitation web app with:
- Next.js 15 + TypeScript + Tailwind CSS v4 + Framer Motion
- Drizzle ORM + Neon DB (PostgreSQL)
- Envelope animation with wax seal → invitation card reveal
- RSVP system (accept/decline)
- Admin panel with password protection (create invites, view responses, counters)
- Mobile-first responsive design
- Elegant aesthetic: dark background, cream cards, gold accents, calligraphic fonts

## Setup required
1. Create Neon DB and set `DATABASE_URL` in `.env.local`
2. Set `ADMIN_PASSWORD` in `.env.local`
3. Run `npm run db:push` to create the table
4. Deploy to Vercel with env vars configured
