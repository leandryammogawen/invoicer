# Invoicer

A full-stack invoicing system built with Next.js, Laravel, and PostgreSQL.

## Tech Stack

Frontend:
- Next.js
- TypeScript
- React
- Tailwind CSS

Backend:
- Laravel
- Laravel Sanctum
- REST API

Database:
- PostgreSQL

## Architecture

```txt
invoicer/
├── api/      → Laravel backend
└── client/   → Next.js frontend
```

Frontend and backend communicate through REST APIs using JSON.

## Deployment

Frontend:
- Vercel

Backend:
- Render

Database:
- PostgreSQL

## Live Demo

Frontend:
https://invoicer-ivory.vercel.app

Backend:
https://invoicer-92jx.onrender.com

## Current Features

- User authentication
- Protected dashboard routes
- Client management
- Invoice management
- Invoice item management
- User-scoped data ownership
- Dashboard navigation
- Production deployment

## Roadmap

Planned:
- Dashboard analytics
- PDF invoice generation
- Email invoice delivery
- Invoice status workflows
- Improved mobile experience
- User profile management

## Key Learnings

- Designing RESTful APIs with Laravel
- Building protected frontend routes in Next.js
- Implementing token-based authentication with Sanctum
- Managing relational data between invoices and clients
- Deploying a full-stack application using Vercel and Render
- Debugging production deployment issues

## Setup Instructions

### Backend

```bash
cd api
composer install
php artisan serve
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Current Project Status

Production MVP Deployed

Completed:
- Authentication
- Client Management
- Invoice Management
- User Ownership & Authorization
- Dashboard Navigation
- Production Deployment

Currently Working On:
- Dashboard UI improvements
- Client experience improvements
- Invoice workflow refinements

## Development History

### Phase 1 — Core CRUD

Implemented:
- Create invoices
- Read invoices
- Update invoices
- Delete invoices

Additional Features:
- React state management
- API integration using fetch
- TypeScript typing
- Laravel API routing
- Relational database integration

### Phase 2 — Invoice Data Model Upgrade

Expanded invoice structure to support more realistic invoice data.

Added:
- Invoice number
- Status
- Issue date
- Due date
- Notes

Updated:
- Laravel migration
- Invoice model fillable fields
- Store and update validation
- Next.js invoice type
- Invoice creation form
- Invoice display

### Phase 3 — Client Management Foundation

Added a dedicated clients table and connected invoices to clients.

Implemented:
- Client model and migration
- Client API endpoints
- Invoice-client relationship
- Laravel Eloquent relationships
- Client dropdown in invoice form

This phase improves the database design by separating client data from invoice records.

### Phase 3 Refactor — Client Relationship Source of Truth

Removed the old client_name field from invoices.

Invoices now reference clients through client_id only.

Updated:
- Invoice database schema
- Invoice model fillable fields
- Invoice validation
- Frontend invoice type
- Invoice creation payload
- Invoice display logic

### Phase 3 Stabilization — Required Client Relationship

Finalized invoice-client relationship rules.

Updated:
- Removed client_name dependency
- Added required client_id to invoices
- Used client relationship as invoice source of truth
- Simplified frontend display to invoice.client.name
- Removed nullable client submission logic

### Phase 4 UI Enhancements

Implemented dynamic invoice item management.

Added:
- Remove item functionality
- Live line total calculations
- Dynamic grand total calculation
- Frontend business rule enforcement
- Immutable state update patterns

### Phase 5 — UI Improvements with Tailwind CSS

Improved the frontend interface using Tailwind CSS.

Implemented:
- Shared spacing and layout structure
- Invoice card styling
- Styled forms and buttons
- Dynamic invoice item UI improvements
- Improved invoice readability
- Responsive dashboard-style interface foundation

The application UI was refactored from basic inline styling toward a scalable component-oriented layout structure.

### Phase 6 — Shared Dashboard Layout

Added a persistent app layout using Next.js App Router.

Implemented:
- Shared sidebar navigation
- Header layout
- Dashboard route
- Invoices route
- Clients route

This prepares the app for modular page-based CRUD features.

### Phase 7 — Client CRUD Interface

Implemented:
- Client listing
- Client creation
- Client editing
- Client deletion
- Controlled React forms
- Dynamic form state handling
- Laravel client API integration
- Local UI synchronization after CRUD operations
- Loading, error, and submission states
- Styled dashboard client interface

This phase introduced complete frontend/backend CRUD synchronization between React state and Laravel APIs.

### Phase 8 — Invoice Update Workflow

Implemented:
- Invoice edit mode
- Dynamic invoice item editing
- Conditional create/update invoice submission
- Invoice deletion
- Cascade deletion handling for invoice items
- Invoice form reset logic
- Relational CRUD synchronization between invoices and invoice items

Invoice updates now recreate invoice items from submitted form state to simplify nested relational updates.

### Phase 9 — Invoice UI Refactor

Refactored the invoice system into reusable React components.

Implemented:
- InvoiceCard component
- InvoiceForm component
- InvoiceItemFields component
- Shared invoice type structure
- Improved separation of concerns
- Reusable invoice UI architecture
- Cleaner page-level state management
- Component-based invoice rendering
- Dynamic invoice detail route
- Single invoice API fetch
- Invoice client details
- Invoice item breakdown
- Status, dates, notes, and total display
- View navigation from invoice cards

This phase transitioned the invoice page from a single large file into a modular component architecture.

### Phase 10 — Authentication & Resource Ownership

Implemented:
- Laravel Sanctum authentication
- User registration endpoint
- User login endpoint
- Logout endpoint
- Authenticated user endpoint
- Personal access token generation
- Protected API routes with auth:sanctum
- User-to-client relationship
- User-to-invoice relationship
- user_id foreign keys for clients and invoices
- User-scoped invoice queries
- User-scoped client queries
- Ownership checks for invoice access
- Ownership checks for client access
- Frontend token storage (localStorage)
- Authorization Bearer token headers
- Protected invoice CRUD requests
- Protected client CRUD requests
- Error handling with try/catch

### Phase 11 — Route Groups & Layout Separation

Implemented:
- Next.js route groups
- (auth) route group
- (dashboard) route group
- Dashboard-specific layout
- Sidebar restricted to dashboard pages
- Login page separated from dashboard layout
- Protected page redirects for unauthenticated users
- Authentication checks using localStorage token
- Shared dashboard layout architecture

### Phase 12 — Centralized API Helper

Implemented:
- Created reusable apiFetch helper
- Centralized API base URL
- Centralized Authorization header injection
- Centralized Accept and Content-Type headers
- Removed repeated fetch configuration across pages
- Refactored clients page API calls
- Refactored invoices page API calls
- Refactored invoice details page API calls
- Refactored login page API calls
- Added automatic error handling for failed requests
- Surfaced Laravel validation messages to frontend

### Phase 13 — Authentication UX & Route Protection

Implemented:
- Login page redirects authenticated users
- Register page redirects authenticated users
- Logout functionality
- Token removal on logout
- Dashboard route protection
- Redirect unauthenticated users to login
- Prevent access to auth pages while logged in
- Protected frontend navigation flow

### Phase 14 — Production Deployment

Implemented:
- Vercel frontend deployment
- Render backend deployment
- Production environment variables
- PostgreSQL production database
- Frontend/backend integration in production
- Authentication testing in production
- End-to-end user workflow testing
- Production bug fixing
- Route and deployment troubleshooting

### Phase 15 — Dashboard Navigation & User Experience

Implemented:
- Persistent sidebar navigation
- Active route highlighting
- Lucide icon integration
- Authenticated user display
- User initials avatar
- Account popover menu
- Logout menu action
- Responsive dashboard shell architecture
- Shared dashboard navigation experience

### Phase 16 — Clients Page Redesign

- Search toolbar
- Add Client modal
- Edit Client modal workflow
- Improved table UI
- Empty state handling
- Dashboard layout fixes
- Sidebar sizing stabilization