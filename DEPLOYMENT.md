# VyaparIQ Deployment Guide

This guide describes how to deploy the VyaparIQ modular SaaS MVP to a production environment.

## 1. Prerequisites
- Docker & Docker Compose
- PostgreSQL running remotely (e.g. AWS RDS, Neon, Supabase)
- A domain name (optional but recommended)

## 2. Environment Setup

Create a `.env` file from `.env.example` with the following variables:

```env
NODE_ENV=production
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
JWT_SECRET="your-strong-jwt-secret"
GEMINI_API_KEY="your-gemini-api-key"
PORT=3000
```

## 3. Production Build & Deployment

VyaparIQ is designed for containerized deployment, making it compatible with Railway, Render, Vercel (for frontend if separated), and Google Cloud Run.

### Using Docker (Render, GCP, Railway)
1. Build the image:
   `docker build -t vyapariq:latest .`
2. Run the image:
   `docker run -p 3000:3000 --env-file .env vyapariq:latest`

### Running the Seed Data
When setting up the database for the first time, make sure to push the Prisma schema and run the seed data for Modules:

```bash
# Apply schema
npx prisma db push

# Seed data
npm run prisma:seed
```

## 4. Production Checklist

- [ ] Ensure `NODE_ENV=production` is set
- [ ] Ensure `DATABASE_URL` is pointing to a highly-available Postgres database
- [ ] Database credentials are secure and IP restricted if possible
- [ ] Run `npx prisma db push` (or `npx prisma migrate deploy` if migrating)
- [ ] Ensure `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` are strong (at least 64 characters)
- [ ] Build process verifies TypeScript and generates `dist/server.cjs`
- [ ] Verify CORS settings match your designated frontend domain/IP in `server.ts`

## 5. Deployment Platforms Compatibility

* **Google Cloud Run**: Automatically works using Dockerfile + Port 3000.
* **Railway**: Pick the GitHub repository, pass variables. The provided `railway.json` handles Docker deployment and healthchecks out of the box.
* **Render**: Use a Web Service, pointing to Docker runtime.
* **Vercel**: We export a `vercel.json` and bundled `dist/server.cjs`. Ensure you set the "Install Command" to `npm ci && npx prisma generate` and "Build Command" to `npm run build`. Note: Full API compat layer might require adjusting `dist/server.cjs` routing pathing. Docker is strictly recommended.
