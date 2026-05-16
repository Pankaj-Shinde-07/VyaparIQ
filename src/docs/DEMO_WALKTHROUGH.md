# VyaparIQ Demo Walkthrough Guide

## Preparation
- Ensure `npx tsx prisma/seed.ts` has been run on the environment.
- This creates the demo tenant: `"Sanjeevani Medico & General Store"`.

## Standard Demo Flow

### 1. Landing Page & Value Proposition
- **Show the hero section.** Explain that VyaparIQ is the modern ERP for Indian storefronts.
- **Show the modules.** We modularize the system (Core POS + Medical, Kirana, Agri).

### 2. Login
- Navigate to `/login`.
- **Action:** Click "Fill Demo Credentials".
- **Action:** Click "Log In".
- *Talking point:* Notice the fast local-first architecture and instant login. 

### 3. Dashboard Experience
- Welcome the user as Rajesh Sharma, the Business Owner.
- **Show the Sidebar.** Highlight that because they subscribed to the "Medical" module, they see specialized Medical menu items (Batch Tracking, Expiry Alerts). If they were a Kirana store, the menu would reflect their needs dynamically.
- **Show Quick Stats.** Emphasize real-time synchronization.

### 4. Admin Under-the-Hood (Operational Polish)
- Point out that there is multi-tenant isolation, ensuring data privacy across businesses.
- Built-in crash tracking (Sentry) and Analytics wrappers ensure enterprise-grade stability on day one.

## Handling Questions

**Q: Can you handle 10,000 SKUs?**
*A: Yes! Our stack uses Serverless Postgres + Prisma + V8 engine for extreme scalability and fast indexing.*

**Q: What about offline mode?**
*A: We are prioritizing Progressive Web App (PWA) cache features in our post-launch roadmap to sustain POS sessions during internet dips.*

**Q: How do you handle GST?**
*A: The platform records GSTIN automatically on businesses and customers, seamlessly filtering invoices for proper GSTR reports.*
