# Motorcycle Maintenance Tracker

A deployed full-stack motorcycle management app for browsing motorcycles, saving bikes to a personal garage, and managing maintenance tasks.

The frontend is a static HTML/CSS/JavaScript app deployed on Cloudflare Pages. The backend is a private Java Spring Boot REST API backed by PostgreSQL and served through Cloudflare Tunnel.

**Live frontend:** https://motorcycle.olysa.app  
**Public API sample:** https://api.olysa.app/api/motorcycles

---

## Overview

Motorcycle Maintenance Tracker started as a frontend-only motorcycle catalog using static JavaScript data and browser storage. It has since been expanded into a full-stack application with persistent backend workflows for garage management and maintenance tracking.

The current version focuses on a practical V1 product flow:

```text
Browse motorcycles
→ Compare models
→ Save a motorcycle to garage
→ Enter current mileage
→ View saved bikes
→ Manage maintenance tasks
```

---

## Why this project matters

This project demonstrates more than a static website. It shows the full path from product idea to deployed system:

- frontend UI and responsive layout
- REST API integration
- backend service-layer design
- PostgreSQL persistence
- user/demo workflow planning
- private admin separation
- Cloudflare-based deployment
- maintainable project organization

---

## Core Features

### Motorcycle Catalog

Users can browse motorcycle models by brand/category and view structured details such as:

- brand
- model
- category
- year
- price
- engine
- horsepower
- weight
- top speed
- 0–60 estimate
- image path

### Compare Page

Users can compare motorcycles side by side across key specs and visual details.

### Garage System

Users can save motorcycles into a garage workflow and track saved bikes separately from the public catalog.

### Maintenance Tracker

Users can manage maintenance-related tasks for saved motorcycles, including status changes and maintenance workflow tracking.

### Updates Page

The site includes an updates/news-style section for project and product changes.

### Mobile Experience

The project includes both responsive public-site styling and a separate mobile-focused experience under the `mobile/` folder.

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Modular static file structure
- 3D model support through `.glb` assets
- Cloudflare Pages deployment

### Backend

- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- REST API architecture
- Linux server deployment
- `systemd` service management
- Cloudflare Tunnel routing

### Tooling / Infrastructure

- Git / GitHub
- Cloudflare Pages
- Cloudflare Tunnel
- Ubuntu/Linux server
- PostgreSQL database

---

## Architecture

```text
Frontend
  HTML/CSS/JavaScript
  Cloudflare Pages
        |
        | fetch()
        v
Backend API
  Spring Boot REST Controllers
        |
        v
Service Layer
  Business logic for garage and maintenance workflows
        |
        v
Persistence Layer
  Spring Data JPA Repositories
        |
        v
Database
  PostgreSQL
```

---

## Frontend Structure

The frontend is organized around stable static pages with assets split by responsibility.

```text
Motorcycle-Maintenance-Tracker-Frontend/
├── index.html
├── bikes.html
├── compare.html
├── garage.html
├── maintenance.html
├── updates.html
├── login.html
├── register.html
├── about.html
├── contact.html
├── assets/
│   ├── css/
│   │   ├── base/
│   │   ├── components/
│   │   ├── pages/
│   │   └── responsive/
│   ├── images/
│   ├── js/
│   │   ├── core/
│   │   ├── components/
│   │   ├── data/
│   │   └── pages/
│   └── models/
└── mobile/
```

### CSS Organization

```text
assets/css/
├── base/          global variables, reset, layout, animations
├── components/    reusable UI pieces like navigation, buttons, widgets
├── pages/         page-specific styles
└── responsive/    responsive/mobile overrides for the public site
```

### JavaScript Organization

```text
assets/js/
├── core/          API client, auth shell, shared formatters
├── components/    reusable UI helpers/widgets
├── data/          shared static/fallback data
└── pages/         page-specific behavior
```

The separate `mobile/` folder is intentionally kept separate from `assets/css/responsive/`.

- `assets/css/responsive/` handles responsive styling for normal public pages.
- `mobile/` contains the separate mobile-focused app shell.

---

## Backend Structure

The backend repository is private, but the system is structured around common Spring Boot layers:

```text
backend/
├── config/
├── controller/
├── dto/
├── model/
├── repository/
├── security/
└── service/
```

Main backend responsibilities:

- expose motorcycle catalog endpoints
- manage saved garage bikes
- manage maintenance tasks
- enforce user/demo workflow rules
- persist data with PostgreSQL
- support frontend API calls through Cloudflare Tunnel

---

## API Examples

Example public motorcycle catalog endpoint:

```text
GET https://api.olysa.app/api/motorcycles
```

Representative backend route groups:

```text
/api/motorcycles
/api/garage
/api/maintenance
/api/auth/demo
```

---

## Security and Privacy Notes

- Private admin tooling is not tracked in the public frontend repository.
- Environment files are excluded from source control.
- Database/schema files are excluded from the public frontend package.
- Backend/admin security must be enforced by the backend, not by hidden frontend routes.
- The backend repository remains private for now.

---

## Deployment

### Frontend

The frontend is deployed as a static site through Cloudflare Pages.

```text
GitHub repository
→ Cloudflare Pages
→ motorcycle.olysa.app
```

### Backend

The backend runs separately as a Spring Boot service on a Linux server.

```text
Spring Boot app
→ systemd service
→ Cloudflare Tunnel
→ api.olysa.app
```

---

## Testing

Current testing focus:

- frontend page flow testing
- API integration testing through the deployed backend
- backend service-layer tests
- garage and maintenance workflow validation

Planned improvements:

- expand backend unit/integration tests
- add CI for backend tests
- add a smoke-test checklist for frontend routes
- add API error-state testing

---

## Project Status

Current status: **organized full-stack V1 / portfolio-ready frontend structure**

Completed:

- deployed public frontend
- deployed backend API
- PostgreSQL-backed motorcycle catalog
- garage workflow
- maintenance workflow
- compare page
- mobile-focused version
- public/private file separation
- organized CSS and JavaScript folders

Still planned:

- more backend test coverage
- CI/CD test checks
- stronger README screenshots/diagrams
- Vite migration later if the frontend grows beyond static HTML
- improved admin/update publishing flow

---

## Future Improvements

- Migrate frontend to Vite when build tooling becomes worth the added complexity.
- Add stronger backend tests around authorization, demo limits, garage ownership, and maintenance task status.
- Move all update/news data fully to backend storage.
- Add source/verification notes for motorcycle performance specs.
- Improve accessibility and keyboard navigation.
- Add loading, empty, and error states consistently across all pages.

---

## What this project demonstrates

- Full-stack application design
- REST API consumption from a static frontend
- Backend persistence using PostgreSQL
- Practical Spring Boot architecture
- Deployment awareness
- Product-focused thinking
- Progressive refactoring from simple static files to a cleaner maintainable structure
