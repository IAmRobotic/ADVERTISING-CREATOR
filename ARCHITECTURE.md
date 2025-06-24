# Chumzee Landing Page Architecture

This document provides a comprehensive overview of the architecture, structure, and technology stack for the Chumzee landing page.

## Project Overview

*   **Product:** Chumzee, a Professional Relationship Management (PRM) tool that helps you grow, manage and nurture your professional network and accelerate your career.
*   **Project Type:** A modern B2C SaaS marketing landing page designed for adults age 27-50, white-collar professionals in mid-to-late career stages with incomes of $80K to $300K per year.
*   **Design Philosophy:** Modern, bold, friendly and approachable with oversized headlines, vivid accent colors (purple/teal gradients), generous white space, asymmetrical content blocks, and conversational copy focused on problem-to-solution narrative flow.

## Technology Stack

*   **Core Framework:** [React](https://react.dev/) v18 with [TypeScript](https://www.typescriptlang.org/) for type safety and modern development.
*   **Build Tool:** [Vite](https://vitejs.dev/) for fast development and optimized builds.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) v3.4+ for utility-first styling with:
    - Custom design tokens and CSS variables for consistent theming
    - Custom animations (gradient-slide, accordion animations)
    - Responsive design patterns
    - Dark mode support (configured but not actively used)
*   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/) component library built on [Radix UI](https://www.radix-ui.com/) primitives.
*   **Routing:** [React Router DOM](https://reactrouter.com/) v6 for client-side navigation.
*   **State Management:** [TanStack Query](https://tanstack.com/query/latest) v5 (configured but not actively used in current implementation).
*   **Forms:** [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/) (available via Shadcn/ui components).
*   **Icons:** [Lucide React](https://lucide.dev/) for consistent iconography.
*   **Interactive Components:** 
    - [Embla Carousel](https://www.embla-carousel.com/) for hero image carousel with autoplay
    - [Sonner](https://sonner.emilkowal.ski/) for toast notifications
*   **Development Tools:**
    - ESLint v9 with React hooks and TypeScript support
    - PostCSS with Autoprefixer
    - Lovable Tagger for component organization

## Architecture

The application follows a modern, component-based architecture with a clear separation of concerns.

```mermaid
graph TD
    A[index.html] --> B[src/main.tsx];
    B --> C[src/App.tsx];
    C --> D{React Router + Query Client};
    D --> E[/ - Index];
    D --> F[/coming-soon - ComingSoon];
    D --> G[/temp - TempInteractions];
    D --> H[* - NotFound];
    E --> I[Landing Page Sections];
    I --> J[Header];
    I --> K[Hero with Carousel];
    I --> L[ProblemSection];
    I --> M[SolutionSection];
    I --> N[NetworkConstellationSection];
    I --> O[TestimonialsSection];
    I --> P[PricingSection];
    I --> Q[Footer];
```

### File Structure

The project is organized with clear separation of concerns:

*   **`public/`**: Static assets including:
    - Product screenshots (contacts-page.png, momentum-sidebar.png, etc.)
    - Hero carousel images and videos (constellation.mp4)
    - Brand assets and favicons
*   **`src/`**: All source code organized by feature and responsibility:
    - **`components/`**: All React components
        - **Landing page sections**: Hero, ProblemSection, SolutionSection, NetworkConstellationSection, TestimonialsSection, PricingSection, Header, Footer
        - **Feature showcases**: Interactions, AI-suggestions, ContactsPreview, NetworkPanels, FeaturesSection
        - **`ui/`**: Complete Shadcn/ui component library (38+ components)
    - **`hooks/`**: Custom React hooks (use-mobile, use-toast)
    - **`lib/`**: Utility functions (mainly utils.ts for className merging)
    - **`pages/`**: Route-level page components
        - `Index.tsx`: Main landing page
        - `ComingSoon.tsx`: Placeholder page
        - `TempInteractions.tsx`: Demo page for component screenshots
        - `NotFound.tsx`: 404 error page
*   **Configuration files**:
    - `vite.config.ts`: Vite build configuration with path aliases
    - `tailwind.config.ts`: Tailwind configuration with custom theme extensions
    - `tsconfig.json`: TypeScript configuration
    - `eslint.config.js`: ESLint configuration for React + TypeScript

### Key Components & Features

#### Landing Page Sections
1. **Header**: Navigation with logo and CTA buttons
2. **Hero**: Auto-playing carousel showcasing product screenshots with gradient-animated CTA
3. **ProblemSection**: Addresses pain points of professional networking
4. **SolutionSection**: Presents Chumzee as the solution with highlighted benefits
5. **NetworkConstellationSection**: Visual metaphor for network growth
6. **TestimonialsSection**: Social proof and user testimonials
7. **PricingSection**: Pricing tiers and signup CTAs
8. **Footer**: Links and company information

#### Interactive Components
- **Interactions.tsx**: Complex demo component showcasing interaction management UI
- **ContactsPreview.tsx**: Displays contact management interface preview
- **AI-suggestions.tsx**: Demonstrates AI-powered networking suggestions
- **NetworkPanels.tsx**: Shows network visualization and management panels

#### Design System
- **Color Palette**: Purple to teal gradients with yellow highlights for emphasis
- **Typography**: Bold, oversized headlines with conversational copy
- **Animations**: Gradient slide animations, hover effects, and smooth scrolling
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Visual Hierarchy**: Strong contrast and asymmetrical layouts

### Routing Strategy

The application uses client-side routing with:
- **Main routes**: `/` (landing page), `/coming-soon`, `/temp` (demo page)
- **Catch-all**: `*` route for 404 handling
- **Scroll behavior**: Smooth scrolling to pricing section from hero CTA

### Performance Considerations

- **Vite**: Fast HMR and optimized production builds
- **Image optimization**: Properly sized screenshots and assets
- **Component lazy loading**: Available but not currently implemented
- **CSS optimization**: Tailwind purging unused styles
- **Bundle splitting**: Vite handles automatic code splitting

## Development Workflow

The codebase follows modern React patterns with:
- **Functional components** with hooks
- **TypeScript** for type safety
- **Component composition** over inheritance
- **Responsive-first** design approach
- **Clean code principles** with descriptive naming and focused responsibilities
