# Personal Portfolio Website

## Overview

This is a modern, responsive personal portfolio website built with React, Express.js, and PostgreSQL. The application showcases a software developer's work, skills, and experience through an elegant single-page design with smooth animations and customizable themes.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and interactions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot module replacement with Vite integration

### Build System
- **Bundler**: Vite for frontend build and development
- **Compiler**: esbuild for server-side TypeScript compilation
- **Package Manager**: npm with lockfile version 3

## Key Components

### Database Schema
The application uses three main tables:
- **portfolio_config**: Stores personal information, contact details, and theme preferences
- **projects**: Contains project details, technologies used, and links
- **services**: Defines offered services with descriptions and icons

### UI Components
- **Portfolio**: Main component orchestrating all sections
- **Navigation**: Responsive navigation with smooth scrolling
- **HeroSection**: Introduction with animated elements and skill showcase
- **AboutSection**: Personal story and statistics
- **ServicesSection**: Services offered with hover animations
- **ProjectsSection**: Featured projects with technology tags
- **ContactSection**: Contact form with validation
- **ThemeCustomizer**: Real-time theme switching with color persistence

### Theme System
- **Dynamic Theming**: CSS custom properties for real-time color changes
- **Theme Persistence**: Local storage integration for user preferences
- **Available Themes**: Purple (default), Blue, Green, Red, Yellow
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Data Flow

1. **Initial Load**: Portfolio configuration loads from static config file
2. **Theme Management**: Theme state managed via custom hook with localStorage persistence
3. **Form Submission**: Contact form uses React Hook Form with Zod validation
4. **Animations**: Framer Motion provides intersection-based animations
5. **Navigation**: Smooth scrolling with active section highlighting

## External Dependencies

### Core Dependencies
- **Database**: Neon Database for serverless PostgreSQL hosting
- **UI Framework**: Radix UI primitives for accessible components
- **Animation**: Framer Motion for complex animations
- **Fonts**: Google Fonts (Inter) and Font Awesome icons
- **Images**: Unsplash for placeholder images

### Development Tools
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESLint and Prettier (implied by project structure)
- **Development Server**: Vite with HMR and error overlay
- **Database Migrations**: Drizzle Kit for schema management

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild compiles TypeScript server to `dist/index.js`
- **Database**: Drizzle migrations applied via `npm run db:push`

### Environment Configuration
- **Platform**: Replit with autoscale deployment target
- **Runtime**: Node.js 20 with PostgreSQL 16 module
- **Port Configuration**: Server runs on port 5000, exposed as port 80
- **Environment Variables**: `DATABASE_URL` required for PostgreSQL connection

### Development Workflow
- **Development**: `npm run dev` starts both frontend and backend with HMR
- **Type Checking**: `npm run check` validates TypeScript across all modules
- **Database**: `npm run db:push` applies schema changes to database

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 27, 2025. Initial setup