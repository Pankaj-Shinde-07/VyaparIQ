# VyaparIQ Launch & Operations Guide

This document outlines the preparation, execution, and monitoring procedures for deploying VyaparIQ to production.

## 1. Production Monitoring Checklist
- [ ] Initialize Sentry (Server + React) via `SENTRY_DSN` and `VITE_SENTRY_DSN`
- [ ] Configure `SUPPORT_EMAIL` and `STATUS_PAGE_URL`
- [ ] Ensure `NODE_ENV=production` is set
- [ ] Confirm Winston/Morgan structured logging output is captured by the cloud provider (Render/Railway/AWS/GCP)
- [ ] Test `/api/admin/health` endpoint securely to verify metrics (connected DB DB, users, tenants).

## 2. Pre-Launch Database Checklist
- [ ] Establish initial database backup schedules and retention policies (e.g., automated daily backups + WAL archiving).
- [ ] Run `npx prisma migrate deploy` in the CI/CD pipeline, NEVER `migrate dev` in production.
- [ ] Lock down Prisma Studio from production access.
- [ ] Seed essential data safely (if required) using idempotent seed scripts. 
- [ ] Ensure connection strings use connection pooling (e.g., PgBouncer / Prisma Accelerate) for production limits.

## 3. Launch Checklist
- [ ] Validate CORS configurations (`CORS_ORIGIN`).
- [ ] Verify SSL/TLS certificates and forced HTTPS redirection.
- [ ] Define API Rate Limits appropriately for production loads.
- [ ] Confirm that environment secrets match `.env.example`.
- [ ] Spin up the environment using `npm run start` (compiled `server.cjs` or `tsx` if compiled).
- [ ] Run end-to-end smoke tests on the live domain (Login, Register, Dashboard Load).

## 4. Incident Response & Rollback Checklist
- [ ] **Acknowledge:** Note the alert within 15 minutes via PagerDuty/Slack.
- [ ] **Assess:** Use Sentry/Logs to find the root cause path. Does this impact all tenants or just one?
- [ ] **To Roll Back App:** Redeploy the previous SHA on your hosting provider. DO NOT rollback the database schema unless the application rollback requires it.
- [ ] **To Roll Back DB:** Apply a down-migration or restore from the latest PITR (Point-In-Time Recovery) backup.
- [ ] **Notify:** If downtime > 5 mins, update `STATUS_PAGE_URL` and notify users via `SUPPORT_EMAIL`.

## 5. Known MVP Limitations
- Subscriptions are currently managed generically. Deep integrations with Stripe/Razorpay might require webhooks handling for edge cases.
- Multi-region DB replication is not currently set up (Single region deployment).
- Audit logs are currently kept in the application DB; at large scale, they should be offloaded to CloudWatch / Datadog or a cold storage bucket.

## 6. Post-Launch Roadmap
- Implement read-replicas for analytical queries (dashboard stats).
- Offload file uploads (medical records, prescriptions) explicitly to S3 instead of DB/local storage if not already done.
- Introduce advanced BI analytics powered by Metabase/Superset.
