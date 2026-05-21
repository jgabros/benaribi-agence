# Implementation Tasks — design-system

## Phase 1: Workspace & Tooling Foundation
- [x] 1.1 Create `pnpm-workspace.yaml` declaring `packages/*` and `apps/*`.
- [x] 1.2 Create root `package.json` with devDependencies (`turbo`, `typescript`).
- [x] 1.3 Create `turbo.json` with build, dev, test, and storybook pipelines.
- [x] 1.4 Create `packages/ui` directory structure.
- [x] 1.5 Create `packages/ui/package.json` (name: `@benaribi/ui`, peerDependencies: `react`, `tailwindcss`, bundled dependencies: `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`).
- [x] 1.6 Create `packages/ui/tsup.config.ts` configured for dual ESM/CJS build and TypeScript declarations.
- [x] 1.7 Create `packages/ui/tsconfig.json` with strict mode enabled.
- [x] 1.8 Create `packages/ui/vitest.config.ts` for jsdom test environment.
- [x] 1.9 Set up Storybook 10 (`packages/ui/.storybook/main.ts` and `preview.ts`) with `@storybook/addon-a11y`.

## Phase 2: Design Tokens & Typography
- [x] 2.1 Download and commit WOFF2 and TTF font files for Cormorant Garamond and DM Sans into `packages/ui/fonts/`.
- [x] 2.2 Create `src/tokens/colors.css` defining 5 brand color tokens.
- [x] 2.3 Create `src/tokens/typography.css` defining `@font-face` declarations and 7-step type scale.
- [x] 2.4 Create `src/tokens/spacing.css`.
- [x] 2.5 Create `src/tokens/tokens.css` importing colors, typography, and spacing.
- [x] 2.6 Create `src/lib/cn.ts` with `clsx` and `tailwind-merge` utility.
- [x] 2.7 Create Storybook stories for Palette and Typography scale.

## Phase 3: Base Interactive Components
- [x] 3.1 Implement `Button` component with primary, secondary, and ghost variants (using `cva` and `@radix-ui/react-slot`).
- [x] 3.2 Write unit tests and Storybook stories for `Button`.
- [x] 3.3 Implement `Input` component with default and error states.
- [x] 3.4 Implement `Textarea` component with default and error states.
- [x] 3.5 Write unit tests and Storybook stories for `Input` and `Textarea`.
- [x] 3.6 Implement `Badge` component with success, neutral, and highlight variants.
- [x] 3.7 Write unit tests and Storybook stories for `Badge`.

## Phase 4: Layout & Content Primitives
- [x] 4.1 Implement `SectionWrapper` component.
- [x] 4.2 Implement `Container` component.
- [x] 4.3 Write tests and stories for layout components.
- [x] 4.4 Implement `Card` compound component (`Card`, `CardImage`, `CardTitle`, `CardBody`).
- [x] 4.5 Write unit tests and Storybook stories for `Card`.

## Phase 5: Brand Elements
- [x] 5.1 Implement `Divider` component.
- [x] 5.2 Implement `DarkOverlay` component.
- [x] 5.3 Implement `GeometricPattern` component (inline SVG).
- [x] 5.4 Implement `Isotipo` (inline SVG) and `Logo` components.
- [x] 5.5 Write unit tests and Storybook stories for all brand elements.

## Phase 6: Structural Shells
- [x] 6.1 Implement `NavigationBar` component with mobile toggle state.
- [x] 6.2 Write unit tests and Storybook stories for `NavigationBar`.
- [x] 6.3 Implement `Footer` component.
- [x] 6.4 Write unit tests and Storybook stories for `Footer`.

## Phase 7: Finalization
- [x] 7.1 Export all components, types, and the `cn` utility from `packages/ui/src/index.ts`.
- [x] 7.2 Run all Vitest unit tests to ensure pass.
- [x] 7.3 Run Storybook build and `a11y` checks to ensure contrast requirements are met.
