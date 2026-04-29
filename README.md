# Motorcycle Maintenance Tracker

A deployed full-stack motorcycle management application for browsing motorcycles, saving bikes to a personal garage, and managing maintenance tasks through a Java Spring Boot + PostgreSQL backend.

This project began as a static HTML, CSS, and JavaScript frontend using local JavaScript arrays and `localStorage`. It has since been upgraded into a deployed full-stack application with REST APIs, persistent PostgreSQL storage, backend-powered garage workflows, maintenance task management, Cloudflare Pages frontend deployment, Cloudflare Tunnel backend routing, and a production-style Linux `systemd` service.

---

## Live Demo

**Frontend:** https://motorcycle-maintenance-tracker.pages.dev  
**Backend API:** https://api.olysa.app/api/motorcycles

> Custom frontend domain target: `https://motorcycle.olysa.app`

---

## Table of Contents

- [Overview](#overview)
- [Project Status](#project-status)
- [Core User Flow](#core-user-flow)
- [Features](#features)
  - [Motorcycle Catalog](#motorcycle-catalog)
  - [Bike Detail Pages](#bike-detail-pages)
  - [Garage System](#garage-system)
  - [Maintenance Task Board](#maintenance-task-board)
  - [Contact Page](#contact-page)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Backend API Routes](#backend-api-routes)
- [Database Design](#database-design)
- [Frontend Structure](#frontend-structure)
- [Deployment Architecture](#deployment-architecture)
- [Testing](#testing)
- [Security Notes](#security-notes)
- [Version History](#version-history)
- [Future Improvements](#future-improvements)
- [What This Project Demonstrates](#what-this-project-demonstrates)

---

## Overview

Motorcycle Maintenance Tracker is a full-stack web application designed to help users explore motorcycles, save bikes to a personal garage, and manage maintenance tasks for each saved motorcycle.

The project demonstrates the evolution of a frontend-only application into a backend-supported system with real API communication, database persistence, service-layer business logic, deployment infrastructure, and production-style server process management.

The current V1 uses a demo-user model instead of full authentication. This keeps the project focused on the core full-stack engineering workflow:

```text
Frontend UI
→ JavaScript fetch()
→ Spring Boot REST API
→ Service Layer
→ Spring Data JPA
→ PostgreSQL
```

---

## Project Status

Motorcycle Maintenance Tracker V1 is a completed full-stack internship-level project.

Current V1 includes:

- Deployed frontend through Cloudflare Pages
- Deployed backend API through Cloudflare Tunnel
- Spring Boot backend running as a persistent Linux `systemd` service
- PostgreSQL-backed motorcycle catalog
- Backend-powered garage system
- Backend-powered maintenance task system
- Current mileage support when saving motorcycles
- Added timestamp support for saved garage bikes
- REST API integration from the frontend
- Service-layer JUnit test coverage
- Cloudflare-managed API domain
- Preserved static frontend version history

This version is intentionally scoped to be realistic and believable for an internship/full-stack portfolio project. The goal is not to overbuild unnecessary enterprise systems, but to show clean architecture, practical backend design, real persistence, deployment awareness, and a complete user workflow.

---

## Core User Flow

```text
Browse motorcycles
→ View bike details
→ Add bike to garage
→ Enter current mileage
→ Open garage
→ Manage maintenance tasks
```

---

## Features

### Motorcycle Catalog

- Browse motorcycles by brand and category
- Load motorcycle catalog data from a Spring Boot API
- Display structured motorcycle information:
  - Brand
  - Model
  - Category
  - Year
  - Price
  - Engine
  - Horsepower
  - Weight
  - Top speed
  - 0–60 estimate
  - Image path
- Preserve fallback static data from the original frontend version for safer development

---

### Bike Detail Pages

- View individual motorcycle showcase pages
- Dynamically render selected motorcycle data
- Display related motorcycles from the same brand/category flow
- Add selected motorcycles to the garage
- Prompt users for current mileage before saving a bike
- Route users from a saved bike into the maintenance workflow

---

### Garage System

- Save motorcycles to a backend-powered garage
- Display saved motorcycles on a dedicated garage page
- Store current mileage for each saved motorcycle
- Store an added timestamp for each garage entry
- Prevent duplicate garage entries
- Enforce a maximum garage size
- Remove motorcycles from the garage
- Display a live garage count badge across pages
- Connect each garage motorcycle to its own maintenance task board

---

### Maintenance Task Board

- Open maintenance tasks for a specific saved garage motorcycle
- Create maintenance tasks
- Display maintenance tasks by status:
  - `PENDING`
  - `IN_PROGRESS`
  - `DONE`
- Update task status through the backend API
- Delete maintenance tasks
- Associate all maintenance records with a specific saved garage bike

The maintenance workflow follows a basic service-board model:

```text
Pending
→ In Progress
→ Done
```

---

### Contact Page

- Includes a dedicated project contact page
- Uses a lightweight frontend-based contact flow for V1
- Backend-powered contact/email handling is planned for a later version

---

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript
- Fetch API
- Cloudflare Pages

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Spring Security
- Maven

### Database

- PostgreSQL

### Testing

- JUnit
- Mockito
- Maven Surefire

### Infrastructure and Deployment

- Ubuntu Server
- Linux `systemd`
- Cloudflare DNS
- Cloudflare Tunnel
- Cloudflare Pages
- GitHub
- Git
- curl
- Nginx tested during deployment setup

---

## Architecture

The backend follows a layered Spring Boot architecture:

```text
Controller
→ Service
→ Repository
→ Entity
→ PostgreSQL
```

### Controller Layer

The controller layer exposes REST API endpoints to the frontend.

Controllers include:

- `MotorcycleController`
- `GarageController`
- `MaintenanceTaskController`

Responsibilities:

- Accept HTTP requests
- Read path variables and request bodies
- Return JSON responses
- Delegate business logic to services

---

### Service Layer

The service layer contains the main business logic.

Responsibilities include:

- Loading the motorcycle catalog
- Finding the demo user
- Loading saved garage motorcycles
- Adding motorcycles to the garage
- Saving current mileage
- Setting garage added timestamps
- Preventing duplicate saved bikes
- Enforcing the garage size limit
- Creating maintenance tasks
- Updating maintenance task status
- Deleting maintenance tasks

---

### Repository Layer

The repository layer uses Spring Data JPA to communicate with PostgreSQL.

Repositories include:

- `MotorcycleRepository`
- `UserRepository`
- `GarageRepository`
- `MaintenanceTaskRepository`

---

### Entity Layer

The entity layer maps Java classes to PostgreSQL tables.

Entities include:

- `Motorcycle`
- `User`
- `Garage`
- `MaintenanceTask`
- `MaintenanceStatus`

---

## Backend API Routes

Public API host:

```text
https://api.olysa.app
```

Frontend API base URL:

```text
https://api.olysa.app/api
```

### Motorcycle Catalog

```http
GET /api/motorcycles
GET /api/motorcycles/{id}
```

### Garage

```http
GET    /api/garage
POST   /api/garage/{motorcycleId}?currentMileage={mileage}
DELETE /api/garage/{garageId}
```

### Maintenance Tasks

```http
GET    /api/garage/{garageId}/tasks
POST   /api/garage/{garageId}/tasks
PATCH  /api/tasks/{taskId}/status
DELETE /api/tasks/{taskId}
```

---

## Database Design

The PostgreSQL database is organized around four main tables:

```text
users
motorcycles
garage
maintenance_tasks
```

### Relationship Overview

```text
users
→ garage
→ motorcycles

garage
→ maintenance_tasks
```

### Table Responsibilities

| Table | Purpose |
|---|---|
| `users` | Stores the demo user used for V1 ownership |
| `motorcycles` | Stores motorcycle catalog data |
| `garage` | Stores saved motorcycles, current mileage, and added timestamps |
| `maintenance_tasks` | Stores service tasks tied to saved garage motorcycles |

### V1 Demo User Model

V1 uses a demo-user model instead of full authentication.

This keeps the project focused on:

- REST API design
- Backend service logic
- Database relationships
- Frontend/backend integration
- End-to-end user workflows

Authentication is intentionally reserved for a later version.

---

## Frontend Structure

The frontend uses modular JavaScript files to separate responsibilities.

| File | Responsibility |
|---|---|
| `data.js` | Loads motorcycle catalog data and supports tracker browsing |
| `bikes.js` | Handles bike detail page rendering and add-to-garage actions |
| `garage.js` | Loads and manages saved garage motorcycles |
| `garageBadge.js` | Loads the live garage count badge across pages |
| `maintenance.js` | Loads, creates, updates, and deletes maintenance tasks |

The frontend originally depended on static JavaScript arrays. The current version now calls the deployed Spring Boot backend using `fetch()`.

Current API base URL:

```text
https://api.olysa.app/api
```

---

## Deployment Architecture

The project uses a split deployment model:

```text
Frontend
→ Cloudflare Pages

Backend API
→ Cloudflare Tunnel
→ Ubuntu Server
→ Spring Boot systemd service
→ PostgreSQL
```

### Public Request Flow

```text
User / Browser
→ https://motorcycle-maintenance-tracker.pages.dev
→ JavaScript fetch()
→ https://api.olysa.app/api
→ Cloudflare Tunnel
→ Ubuntu Server localhost:8081
→ Spring Boot
→ PostgreSQL
```

---

### Backend Deployment

The Spring Boot backend is packaged as a runnable JAR:

```text
motorcycle-tracker-backend-0.0.1-SNAPSHOT.jar
```

The backend runs as a Linux `systemd` service:

```text
motorcycle-tracker-backend.service
```

This allows the backend to:

- Start automatically after a server reboot
- Restart after failure
- Run without an open SSH terminal
- Behave like a production service instead of a development process

Instead of relying on:

```bash
./mvnw spring-boot:run
```

the server runs the application using:

```bash
java -jar target/motorcycle-tracker-backend-0.0.1-SNAPSHOT.jar
```

---

### Cloudflare Tunnel

Cloudflare Tunnel is used to expose the backend API securely without opening direct inbound ports to the home network.

Tunnel route:

```text
api.olysa.app
→ http://localhost:8081
```

This keeps the backend and database private to the server while exposing the API through a managed Cloudflare hostname.

---

### Frontend Deployment

The frontend is deployed through Cloudflare Pages as a static site.

Cloudflare Pages serves:

```text
HTML
CSS
JavaScript
Images
```

No frontend build framework is required because the project is plain HTML/CSS/JavaScript.

Pages build configuration:

```text
Framework preset: None
Build command: exit 0
Build output directory: .
```

---

## Testing

JUnit testing was added for backend service logic.

Current test coverage includes a service-layer test for adding a motorcycle to the garage with mileage.

The test verifies that:

- A motorcycle can be saved to the garage
- The selected motorcycle is attached to the garage entry
- The entered mileage is stored correctly
- An added timestamp is created

Testing tools:

- JUnit
- Mockito
- Maven Surefire

Example test class:

```text
GarageServiceTest
```

This test focuses on service-layer behavior and uses mocked repositories so the business logic can be tested without requiring a live PostgreSQL database during the unit test.

---

## Security Notes

- Database credentials are not stored in frontend code
- Database credentials are provided through server-side environment variables
- PostgreSQL is not publicly exposed
- Spring Boot runs locally on the Ubuntu server behind Cloudflare Tunnel
- Public API traffic reaches the backend through Cloudflare, not direct router port forwarding
- Frontend JavaScript only calls public API routes
- Backend runtime configuration remains private
- Secrets should never be committed to GitHub

Sensitive values are stored outside the repository using environment variables such as:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
```

The frontend repository can remain public because it only contains static assets and public API calls. Backend secrets and database credentials remain server-side.

---

## Version History

### `v1-static-datajs`

The original frontend-only version of the project.

```text
HTML
CSS
JavaScript arrays
localStorage
static motorcycle catalog
frontend-only garage behavior
```

This version is preserved with the Git tag:

```text
v1-static-datajs
```

---

### Current Full-Stack V1

The current version upgrades the project into a deployed backend-supported application.

```text
Spring Boot REST API
PostgreSQL database
backend-powered motorcycle catalog
backend-powered garage
backend-powered maintenance tasks
current mileage support
garage added timestamps
frontend API integration
Cloudflare Tunnel backend deployment
Cloudflare Pages frontend deployment
systemd backend service
```

---

## Future Improvements

Potential V2 improvements:

- Real user authentication
- Account-based garages
- Full maintenance history
- Mileage-based maintenance reminders
- Maintenance interval recommendations
- Downloadable maintenance summaries
- Notification system
- Better mobile-first UI
- Dashboard analytics
- Admin catalog management
- Expanded JUnit coverage
- CI/CD pipeline for backend deployment
- Production database migration tooling
- Olysa-branded multi-product platform direction

---

## What This Project Demonstrates

This project demonstrates the progression from a static frontend project into a real full-stack application.

Key engineering concepts shown:

- REST API design
- Java Spring Boot backend development
- PostgreSQL database modeling
- Frontend/backend integration
- CRUD-style workflows
- Service-layer business logic
- JUnit service testing
- Modular frontend JavaScript
- Cloudflare-based deployment
- Secure backend exposure through Cloudflare Tunnel
- Linux service management with `systemd`
- Practical full-stack architecture
- Realistic internship-level software engineering scope
