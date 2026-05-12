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