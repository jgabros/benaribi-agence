# Brief: design-system

## Problem
Benaribi Agence needs a coded design system that translates its brand identity (negro carbón, dorado champán, arco de herradura marroquí) into reusable React/Tailwind components. Without this foundation, both the public website and client portal risk visual inconsistency and require redundant styling work.

## Current State
Brand palette and typography are defined in the discovery briefing (colors: #1C1C1C, #F5F3EF, #C4A35A, #3D8B7A, #E0DDD8; fonts: Cormorant Garamond + DM Sans). No coded implementation exists.

## Desired Outcome
A complete design system package: Tailwind config extended with brand tokens, Google Fonts integration, base components (Button, Card, Input, Navigation, Section, Typography) that both the public website and client portal import and use consistently. Every color combination passes WCAG AA.

## Approach
Define brand tokens in Tailwind config (colors, typography, spacing). Implement base components as React/Tailwind primitives. Self-host Cormorant Garamond and DM Sans font files (required for WeasyPrint PDF compatibility in fastapi-backend). Document components in a showcase page.

## Scope
- **In**: Tailwind theme extension with brand palette (#1C1C1C, #F5F3EF, #C4A35A, #3D8B7A, #E0DDD8) + custom font stacks; Typography scale — Cormorant Garamond for headings/accents, DM Sans for body/UI; Self-hosted font files (WOFF2) for both typefaces; Base components: Button (primary/secondary/ghost variants), Card, Input, Textarea, Badge, Divider (dorado hairline), SectionWrapper, NavigationBar shell, Footer shell; Logo/isotipo SVG (arco de herradura vectorial) integration; Dark overlay utility for hero images; Geometric pattern primitive for decorative use; Component showcase page
- **Out**: Application-specific components (property cards, operation timeline, document upload — those belong in consuming specs); Icon library beyond brand isotipo; Animation library; Form validation logic; Page layouts

## Boundary Candidates
- Brand tokens (Tailwind config + CSS custom properties)
- Typography components (headings h1–h6, body, label, caption)
- Interactive base components (buttons, inputs, links)
- Layout primitives (section wrapper, container, grid)
- Brand elements (logo SVG, divider, dark overlay, geometric pattern)

## Out of Boundary
- Page layouts and routing (public-website and client-portal)
- Business-logic components (ROI calculator UI, document uploader — consuming specs)
- Icon sets beyond the brand isotipo

## Upstream / Downstream
- **Upstream**: Discovery briefing defines palette, fonts, and visual tone
- **Downstream**: public-website and client-portal both import all components from this package

## Existing Spec Touchpoints
- **Extends**: none (greenfield)
- **Adjacent**: public-website, client-portal — import from this spec's output

## Constraints
- All color combinations must pass WCAG AA (4.5:1 body text, 3:1 large text)
- Font files must be self-hosted as WOFF2 — Google Fonts CDN URLs are NOT sufficient (WeasyPrint PDF compatibility)
- Tailwind v3 (v4 is not production-stable)
- Zero runtime CSS-in-JS — utility classes only
