# Overview

This is a heritage website dedicated to Guru Tegh Bahadur Ji, the ninth Sikh Guru. The website presents a comprehensive digital museum experience featuring:

- **Biography & Timeline**: Detailed life history with chronological events from 1621-1675
- **Shabads & Raags**: Sacred hymns (Bani) organized by 15 classical Indian ragas, including Gurmukhi text, meanings, and Prof. Sahib Singh Ji's commentary
- **Historic Gurdwaras**: Information about Gurdwaras associated with Guru Tegh Bahadur Ji's journey
- **Educational Resources**: Downloadable materials including PDFs and reference documents

All content is presented in Gurmukhi Punjabi script while maintaining standard numerals (e.g., 1621, 1675) for dates. The design follows a museum-quality, spiritually reverent aesthetic inspired by premium heritage platforms like the Smithsonian and British Museum online collections.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Stack**: React with TypeScript, Vite build system, Wouter for routing

**UI Framework**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling

**Design System**:
- Custom color palette defined via CSS variables supporting light/dark modes
- Gurmukhi typography using "Noto Sans Gurmukhi" and "Mukta Mahee" Google Fonts
- Museum-quality design with calm, spiritual aesthetic
- Responsive grid layouts with generous spacing (max-w-7xl containers)
- Elevation/shadow system for subtle depth effects

**State Management**: 
- TanStack Query (React Query) for server state management
- React hooks for local component state
- No global state management library (unnecessary for this use case)

**Key Architectural Decisions**:
- Single-page application with smooth scroll navigation to sections
- Section-based layout: Hero → Biography → Shabads → Gurdwaras → Resources
- Timeline component with fixed left sidebar for biography navigation
- Modal/overlay system for detailed Gurdwara information and PDF viewing
- Client-side rendering with API data fetching

## Backend Architecture

**Runtime**: Node.js with Express.js server

**API Design**: RESTful JSON API with organized endpoints:
- `/api/biography/*` - Timeline events and biography sections
- `/api/shabads/*` - Hymns and their details
- `/api/raags/*` - Raag (musical mode) information
- `/api/gurdwaras/*` - Historic Gurdwara data
- `/api/resources/*` - Downloadable resources

**Data Storage Strategy**:
- JSON file-based storage for static content (Gurdwara data loaded from filesystem)
- In-memory data structures exported from TypeScript modules
- Storage abstraction layer (`IStorage` interface) for potential future database migration

**Architectural Rationale**:
- File-based storage chosen for simplicity since content is mostly static/historical
- Storage interface provides flexibility to swap implementations without changing API routes
- Express middleware for request logging and JSON body parsing
- Vite integration for development with HMR support

## Database Schema

**Current Implementation**: No active database connection despite Drizzle ORM configuration present

**Schema Definitions** (in `shared/schema.ts`):
- TypeScript interfaces define data models (TimelineEvent, BiographySection, Shabad, RaagInfo, Gurdwara, Resource)
- Drizzle schema configuration exists but appears unused in current implementation
- PostgreSQL configured via environment variable (DATABASE_URL) but not actively utilized

**Design Decision**: 
- Started with Drizzle + PostgreSQL setup but currently using in-memory/file-based storage
- Schema types shared between client and server via `shared/` directory for type safety
- Potential future migration path to database already established

## External Dependencies

**UI Component Library**:
- Radix UI primitives for accessible, unstyled components
- shadcn/ui configuration for styled component variants
- Tailwind CSS for utility-first styling

**Data Fetching**:
- TanStack Query for async state management, caching, and request deduplication

**Development Tools**:
- Vite for fast development server and optimized production builds
- Replit-specific plugins for runtime error handling and debugging
- TypeScript for type safety across entire stack

**Database (Configured but Inactive)**:
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connection
- drizzle-zod for schema validation

**Typography**:
- Google Fonts CDN for Gurmukhi fonts (Noto Sans Gurmukhi, Mukta Mahee)

**Form Handling**:
- React Hook Form with Zod resolvers (included in dependencies, may be for future features)

**Routing**:
- Wouter for lightweight client-side routing

**File Serving**:
- Static assets served from `/attached_assets` directory for PDFs and other downloadable resources