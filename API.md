# VyaparIQ API Documentation

The core system is accessible under `/api/v1` and follows RESTful conventions. Full OpenAPI documentation is available by navigating to `/api-docs` when the server is running.

## Authentication (`/api/v1/auth`)

- `POST /auth/register`: Create a new user account.
- `POST /auth/login`: Authenticate and receive an access token.

## Users (`/api/v1/users`)

- `GET /users/me`: Return context indicating the authenticated caller.
- `PATCH /users/me`: Update core user profile fields.

## Businesses (`/api/v1/businesses`)

- `POST /businesses`: Create a tenant (business) linked to the owner.
- `GET /businesses/me`: Read info about the caller's business.
- `PATCH /businesses/me`: Update tenant-level information (e.g. GSTIN, Address).

## Modules Gateway (`/api/v1/modules`)

- `GET /modules/available`: Fetch all globally available modules (e.g. MEDICAL, KIRANA).
- `GET /modules/me`: Retrieve all active modules the business is subscribed to.
- `POST /modules/subscribe`: Activate a module for the current business.

## Medical Module (`/api/v1/products` / `customers` / `invoices`)

\* *Requires Authentication and valid Medical Module Subscription*

- `POST /products`: Create an inventory product line item.
- `GET /products`: List all inventory components.
- `GET /customers`: Retrieve business-specific customers.
- `POST /invoices`: Create billing cycle invoices connecting customers and products.
