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