# Invoicer

A full-stack invoicing system built with Next.js, Laravel, and MySQL.

## Tech Stack

Frontend:
- Next.js
- TypeScript
- React
- Tailwind CSS

Backend:
- Laravel
- REST API
- MySQL

## Architecture

```txt
invoicer/
├── api/      → Laravel backend
└── client/   → Next.js frontend
```

Frontend and backend communicate through REST APIs using JSON.

## Features Completed

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
- MySQL database integration

## Current Features

- Invoice listing
- Invoice creation form
- Invoice editing
- Invoice deletion
- Paid/unpaid status display

## Features Planned

- Invoice status system
- Invoice items
- Client management
- PDF invoice generation
- Authentication
- Dashboard analytics
- Email invoices
- Deployment

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

Phase 1 Completed:
- Full CRUD functionality completed

Next Phase:
- Advanced invoice data structure
- Invoice statuses
- Client relationships

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