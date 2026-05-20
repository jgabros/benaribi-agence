# Research & Design Decisions — design-system

## Summary
- **Feature**: `design-system`
- **Discovery Scope**: New Feature (greenfield monorepo, no existing application code)
- **Key Findings**:
  - Tailwind v4 `@theme` CSS-first tokens simultaneously generate utility classes and CSS custom properties, eliminating a separate token-extraction step and giving the FastAPI PDF renderer a direct CSS variable interface.
  - WeasyPrint does not support WOFF or WOFF2 — it requires TTF/OTF. The font bundle must ship both WOFF2 (web) and TTF (PDF) files in the same `packages/ui/fonts/` directory.
  - Teal (#3D8B7A) achieves only ~3.65–3.66:1 contrast against any text color at normal text size, which fails WCAG AA 4.5:1. The Badge `success` variant must use a bordered/outline style rather than a solid teal fill to remain compliant.

---

## Research Log

### Technology Stack — React Component Library (2025)

- **Context**: Choosing the right build tooling, styling system, and accessibility primitives for a greenfield design system.
- **Sources Consulted**:
  - Tailwind CSS v4.0 release blog (tailwindcss.com/blog/tailwindcss-v4)
  - tsup documentation + pnpm workspace guides
  - Radix UI vs Headless UI vs Ark UI comparative analysis (logrocket.com)
  - Storybook 10 release notes and comparison with Ladle/Histoire
  - CVA official docs (cva.style)
- **Findings**:
  - **Monorepo**: pnpm workspaces with Turborepo is the 2025 standard for sibling-app design system consumption. The design system lives at `packages/ui`, apps at `apps/web` and `apps/portal`.
  - **Build**: tsup (esbuild-based, dual ESM + CJS + .d.ts) is preferred over raw Rollup. Zero-config for library mode.
  - **Tokens**: Tailwind v4 `@theme` CSS block generates both Tailwind utility classes (`bg-charcoal-black`) and `:root` CSS custom properties (`--color-charcoal-black`) from a single declaration. No separate token extraction tool needed.
  - **Variants**: CVA (class-variance-authority) remains the 2025 standard for typed React component variants.
  - **Accessibility**: Radix UI Primitives (`@radix-ui/react-slot` minimum, targeted primitives for accessible components). Most widely used with Tailwind; powers shadcn/ui at Vercel/Supabase scale.
  - **Showcase**: Storybook 10 with `@storybook/react-vite` — preferred over a plain Vite dev app for longevity and team onboarding.
  - **Testing**: Vitest + React Testing Library + jsdom. No Jest needed in a Vite-based monorepo.
- **Implications**: Full stack confirmed. No custom variant logic, no custom accessibility primitives, no custom showcase app needed.

### Font Self-Hosting and WeasyPrint Compatibility

- **Context**: Req 3 requires font files bundled with the package for offline PDF generation (FastAPI/WeasyPrint).
- **Sources Consulted**:
  - WeasyPrint GitHub issue #1259 (WOFF/WOFF2 not supported)
  - pythontutorials.net/blog/how-to-use-custom-font-with-weasyprint
  - fontsource.org/fonts/cormorant-garamond
  - google-webfonts-helper (gwfh.mranftl.com) — download tool
- **Findings**:
  - WeasyPrint uses FreeType/FontConfig internally. It does not support WOFF or WOFF2. TTF or OTF are required.
  - Fontsource npm packages (`@fontsource/cormorant-garamond`, `@fontsource/dm-sans`) ship WOFF2 only — cannot be used directly for WeasyPrint.
  - `google-webfonts-helper` generates zip files with both WOFF2 and TTF for any Google Font, with ready @font-face CSS snippets. This is the correct tool for obtaining TTF files.
  - Both file formats must be committed to `packages/ui/fonts/`. The web build serves WOFF2 via @font-face; the FastAPI service references TTF files via absolute path in its own WeasyPrint CSS.
- **Implications**: 
  - `packages/ui/fonts/` contains 10 files: 5 × WOFF2 + 5 × TTF for the required weights (Cormorant Garamond 400/400i/700, DM Sans 400/500).
  - The FastAPI spec must copy or reference TTF files from this package. This is a documented dependency seam in the Revalidation Triggers.
  - @font-face declarations use `url('../fonts/*.woff2') format('woff2'), url('../fonts/*.ttf') format('truetype')` — both sources declared for robustness.

### WCAG AA Contrast Analysis

- **Context**: Req 15 mandates WCAG AA compliance for all components. Teal is specified as the `success` color for the Badge component (Req 14.1).
- **Calculated contrast ratios** (WCAG 2.1 relative luminance formula):

| Pair | Ratio | AA Normal (4.5:1) | AA Large (3:1) |
|------|-------|-------------------|----------------|
| Champagne-gold (#C4A35A) on charcoal-black (#1C1C1C) | 7.09:1 | PASS | PASS |
| Off-white (#F5F3EF) on charcoal-black (#1C1C1C) | 15.38:1 | PASS | PASS |
| Charcoal-black (#1C1C1C) on champagne-gold (#C4A35A) | 7.09:1 | PASS | PASS |
| Charcoal-black (#1C1C1C) on marble-grey (#E0DDD8) | 12.58:1 | PASS | PASS |
| Teal (#3D8B7A) on off-white (#F5F3EF) | 3.66:1 | **FAIL** | PASS |
| Charcoal-black (#1C1C1C) on teal (#3D8B7A) | ~4.14:1 | **FAIL** | PASS |
| Off-white (#F5F3EF) on teal (#3D8B7A) | 3.66:1 | **FAIL** | PASS |

- **Implication**: Teal cannot be used as a solid fill for Badge when normal-size text appears on it. See Badge WCAG Constraint design decision below.

---

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Decision |
|--------|-------------|-----------|---------------------|----------|
| pnpm monorepo + Turborepo | Workspace packages, shared build cache | Standard for sibling-app design systems; publishable if needed | Requires pnpm (not npm/yarn) | **Selected** |
| Standalone package (npm publish) | Separate repo, published to npm registry | Full independence | Overhead for a private project; extra publish step | Rejected — same repo, no publish needed |
| Vite library mode | Alternative build tool for component libraries | Good DX with HMR | Requires separate tsc for robust .d.ts; more config | Rejected in favor of tsup |
| Tailwind v3 JS config | Token configuration in `tailwind.config.ts` | Familiar pattern | Does not emit CSS custom properties natively; separate step needed for CSS vars | Rejected — v4 `@theme` solves both problems |
| Storybook 10 | Component showcase with a11y addon | Full addon ecosystem, MDX docs | Slightly heavier than Ladle/Histoire | **Selected** — longevity and accessibility tooling matter |
| Plain Vite app for showcase | Lightweight dev app | Fast boot | No a11y addon, no docs generation | Rejected |

---

## Design Decisions

### Decision: Tailwind v4 `@theme` as Single Token Source

- **Context**: Brand tokens must be available as both Tailwind utility classes and as CSS custom properties (for the FastAPI/WeasyPrint CSS context).
- **Alternatives Considered**:
  1. Tailwind v3 JS config + separate CSS variables export step
  2. Style Dictionary (W3C DTCG format) → generates both formats
  3. Tailwind v4 `@theme`
- **Selected Approach**: Tailwind v4 `@theme` — declarations in `@theme {}` blocks simultaneously generate Tailwind utility classes and emit `:root` CSS custom properties. One source of truth, zero tooling overhead.
- **Rationale**: Eliminates a build step and avoids synchronization drift between JS token values and CSS variable values.
- **Trade-offs**: Tailwind v4 is a major version with a CSS-first paradigm shift; consuming apps must also adopt v4. Given this is a greenfield monorepo with no existing Tailwind v3 usage, there is no migration cost.
- **Follow-up**: Document the `@import "@benaribi/ui/tokens.css"` pattern in the Storybook introduction story.

### Decision: Badge Teal Variant — Bordered/Outline Style

- **Context**: Req 14.1 specifies "positive/success (using brand teal)" for a Badge variant. Req 14.2 requires WCAG AA 4.5:1 contrast for normal text. Req 15.1 mandates WCAG AA for all text/background combinations.
- **Alternatives Considered**:
  1. Solid teal fill with off-white text — 3.66:1, fails AA normal
  2. Solid teal fill with charcoal-black text — ~4.14:1, fails AA normal
  3. Darken teal to ~#2E6E60 for Badge — reaches 4.5:1, but introduces an unlisted color (violates Req 1.3)
  4. Bordered/outline style: teal border, off-white (#F5F3EF) background, charcoal-black text — 15.38:1
- **Selected Approach**: Option 4 — bordered outline. Teal color signals the "success" semantic through the border color; text achieves 15.38:1 on off-white background.
- **Rationale**: Req 14.1 says "using brand teal" — the bordered variant uses teal as the distinguishing brand color element without requiring teal as a text background. This satisfies both Req 14.1 and 14.2/15.1 simultaneously without palette extension.
- **Trade-offs**: Slightly different visual weight than filled neutral/highlight variants. Consistent with common success-badge patterns (GitHub, Linear, Vercel all use bordered styles for success/completed states).
- **Follow-up**: Document the visual rationale in the Storybook story for Badge to prevent future attempts to "fix" the outline by making it solid.

### Decision: Font Dual-Format Bundle (WOFF2 + TTF)

- **Context**: Req 3 requires fonts usable offline in a PDF generation context (WeasyPrint).
- **Alternatives Considered**:
  1. WOFF2 only (Fontsource packages) — WeasyPrint incompatible
  2. TTF only — larger files for web; browsers prefer WOFF2
  3. WOFF2 + TTF committed to `packages/ui/fonts/` — both use cases served
- **Selected Approach**: Option 3 — both formats committed to the repository.
- **Rationale**: Static font assets are a stable, infrequently-changed artifact. Committing both formats is simpler than a fetch/conversion step in CI.
- **Trade-offs**: Increases repository size by ~2–4MB for font files. Acceptable for a private project.
- **Follow-up**: fastapi-backend spec must document the `packages/ui/fonts/*.ttf` path and include it in the Python package asset manifest.

### Decision: Monorepo Bootstrap as Part of Design-System Implementation

- **Context**: The project has no existing monorepo structure. public-website and client-portal are future specs that depend on design-system being importable as a workspace package.
- **Selected Approach**: The design-system implementation creates the monorepo scaffold (`pnpm-workspace.yaml`, `turbo.json`, root `package.json`) as well as `packages/ui/`. The monorepo root files are minimal and intentionally extensible by downstream specs.
- **Rationale**: The design-system cannot be installed and consumed by sibling apps without the workspace structure. Creating it here avoids blocking all downstream specs.
- **Trade-offs**: Design-system implementation task 1 includes monorepo scaffolding, which is technically a cross-spec concern.

---

## Synthesis Outcomes

### Generalizations Found
- **Variant systems**: Button (primary/secondary/ghost), Badge (success/neutral/highlight), Divider (full/centered) all use CVA. One pattern handles all three.
- **Slot composition**: Card (title/body/image), NavigationBar (logo/links/action), Footer (columns/bottomBar) all use `ReactNode` prop slots. One composition pattern handles all three shell components.
- **Form input states**: Input and Textarea share identical state machine (default/focused/error) and ARIA error pattern. Share a common `FormFieldProps` base interface.

### Build vs. Adopt Outcomes
- **CVA**: Adopted — typed variant system, no custom implementation.
- **Radix UI `@radix-ui/react-slot`**: Adopted for polymorphic Button rendering.
- **Storybook 10**: Adopted for showcase (satisfies Req 16 entirely).
- **tsup**: Adopted for build — no custom Rollup config.
- **`cn()` utility (clsx + tailwind-merge)**: Adopted pattern — single utility in `lib/cn.ts`.

### Simplifications Applied
- No Radix Dialog needed for the NavigationBar mobile toggle — a plain `useState` with `aria-expanded` / `aria-controls` is sufficient for a shell component with no application routing logic.
- No separate token extraction tool (Style Dictionary etc.) — Tailwind v4 `@theme` handles dual-format output natively.
- No separate showcase app — Storybook 10 satisfies Req 16 while also serving as the testing/documentation environment.

---

## Risks & Mitigations

- **Teal badge bordered style may be redesigned** — Risk: future designer unfamiliar with the WCAG constraint may request a solid teal Badge. Mitigation: document the constraint in the Storybook story and in `design.md`.
- **TTF font files not committed** — Risk: CI fails WeasyPrint tests because fonts are missing. Mitigation: add a CI check that asserts `packages/ui/fonts/*.ttf` files exist before running tests.
- **Tailwind v4 adoption** — Risk: consuming apps currently on Tailwind v3 would need to upgrade. Mitigation: all consuming apps (web, portal) are greenfield and will be initialized with v4 from the start.
- **Storybook incompatibility** — Risk: Storybook addon ecosystem lags Tailwind v4 support. Mitigation: `@storybook/react-vite` handles the Vite/PostCSS pipeline; Tailwind v4 works as a PostCSS plugin in the Vite build.

---

## References

- [Tailwind CSS v4.0 — Official Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme)
- [CVA — class-variance-authority](https://cva.style/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [tsup documentation](https://tsup.egoist.dev/)
- [WeasyPrint Font System (GitHub Issue #1259)](https://github.com/Kozea/WeasyPrint/issues/1259)
- [google-webfonts-helper](https://gwfh.mranftl.com/fonts)
- [Fontsource — Cormorant Garamond](https://fontsource.org/fonts/cormorant-garamond)
- [Storybook 10 release](https://storybook.js.org/blog/storybook-10)
- [pnpm workspaces](https://pnpm.io/workspaces)
