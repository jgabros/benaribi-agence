# Requirements Document

## Introduction

The Design System is the coded brand foundation shared by the Benaribi Agence public marketing website and client portal. It translates the Benaribi visual identity — the charcoal-black/champagne-gold/off-white brand palette, Cormorant Garamond/DM Sans typography, and the arco de herradura marroquí motif — into reusable, accessible components and design tokens that both platforms consume consistently. Its primary consumers are frontend developers building on the Benaribi platform.

## Boundary Context

- **In scope**: Brand color tokens, typography scale, self-hosted font files, base interactive components (Button, Card, Input, Textarea, Badge), layout primitives (SectionWrapper, Container), brand elements (Logo SVG, Divider, Dark Overlay, Geometric Pattern), navigation and footer shells, WCAG AA compliance for all components, and a component showcase page.
- **Out of scope**: Application-specific components (property listing cards, operation timeline, document uploader, fiscal calculator UI — those belong in the public-website and client-portal specs); routing or navigation logic; icon libraries beyond the brand isotipo; animation frameworks; form validation logic; page-level layouts.
- **Adjacent expectations**: The Design System provides font files via local references (not external CDN URLs) so that fastapi-backend can generate correctly typeset PDFs using the same brand fonts. Both public-website and client-portal import all visual primitives from this spec's output.

## Requirements

### Requirement 1: Brand Color Tokens

**Objective:** As a frontend developer, I want a well-defined brand color palette exposed as named design tokens, so that all visual elements across the public website and client portal use consistent, brand-accurate colors.

#### Acceptance Criteria
1. The Design System shall expose the five brand colors as named design tokens: charcoal-black (#1C1C1C), off-white (#F5F3EF), champagne-gold (#C4A35A), teal (#3D8B7A), and marble-grey (#E0DDD8).
2. When a developer applies a brand color token to a UI element, the rendered output shall match the corresponding hex value precisely.
3. The Design System shall not extend the brand palette with additional named colors outside the five defined brand colors.

---

### Requirement 2: Typography Scale

**Objective:** As a frontend developer, I want a typographic scale with Cormorant Garamond for headings and DM Sans for body text, so that all text across the platform reflects the premium brand identity consistently.

#### Acceptance Criteria
1. The Design System shall define Cormorant Garamond (regular, bold, and italic weights) as the typeface for heading elements across all size levels.
2. The Design System shall define DM Sans (regular and medium weights) as the typeface for body text and UI labels.
3. The Design System shall provide a typographic scale with at least six size steps, from a display/headline size down to a caption size.
4. When fonts fail to load for any reason, the Design System shall display a system serif fallback for headings and a system sans-serif fallback for body text without causing layout shift.

---

### Requirement 3: Self-Hosted Font Files

**Objective:** As a developer deploying the design system in a server-side PDF generation context, I want brand font files bundled with the design system package, so that PDF rendering produces correct Benaribi typography without depending on an external CDN.

#### Acceptance Criteria
1. The Design System shall include Cormorant Garamond and DM Sans as self-hosted font files within the package itself.
2. The Design System shall declare these fonts using local file references, not external CDN URLs.
3. When the Design System is consumed in an environment without internet access, all typography shall render correctly using the bundled font files.

---

### Requirement 4: Button Component

**Objective:** As a frontend developer, I want a Button component with primary, secondary, and ghost variants, so that call-to-action elements maintain consistent visual treatment across the platform.

#### Acceptance Criteria
1. The Design System shall provide a Button component with three visual variants: primary (filled, using champagne-gold as the background), secondary (outlined), and ghost (text-only with a visible hover treatment).
2. When a user hovers or focuses a Button, the Design System shall display a clearly visible state change on that button.
3. When a Button is in a disabled state, the Design System shall render it with reduced opacity and suppress all interaction feedback.
4. The Design System shall ensure all Button variants meet a minimum touch target size of 44×44 pixels on mobile viewports.
5. The Design System shall ensure the contrast ratio between Button label text and its background meets WCAG AA (minimum 4.5:1 for normal-weight text).

---

### Requirement 5: Card Component

**Objective:** As a frontend developer, I want a Card component for structured content grouping, so that property summaries, service descriptions, and other content blocks have a consistent container treatment.

#### Acceptance Criteria
1. The Design System shall provide a Card component with a title slot, a body content slot, and an optional image slot positioned at the top of the card.
2. The Design System shall render Card components with the brand background color and consistent internal padding.
3. When multiple Cards are placed in the same row within a grid layout, the Design System shall ensure all Cards in that row share equal height.

---

### Requirement 6: Form Input Components

**Objective:** As a frontend developer, I want Input and Textarea components styled to the brand palette, so that form fields across the platform present a consistent and premium appearance.

#### Acceptance Criteria
1. The Design System shall provide an Input component with at least three visual states: default, focused, and error.
2. The Design System shall provide a Textarea component with at least three visual states: default, focused, and error.
3. When an Input or Textarea receives keyboard or pointer focus, the Design System shall display a visible focus ring using a brand color.
4. If an Input or Textarea is in an error state, the Design System shall display an error indicator that does not rely on color alone (an icon or label text must accompany any color change).
5. The Design System shall ensure Input and Textarea components have a minimum height of 44 pixels for touch usability.

---

### Requirement 7: Layout Primitives

**Objective:** As a frontend developer, I want SectionWrapper and Container layout components, so that all pages use consistent vertical spacing, maximum widths, and horizontal gutters across viewport sizes.

#### Acceptance Criteria
1. The Design System shall provide a SectionWrapper component that applies consistent vertical padding to page sections.
2. The Design System shall provide a Container component that constrains content to a maximum width and applies responsive horizontal padding.
3. When rendered on a mobile viewport (below 768px wide), the Container shall apply reduced horizontal padding without causing horizontal scrolling.
4. When rendered on a large desktop viewport (1280px wide or wider), the Container shall cap maximum content width and horizontally center it within the viewport.

---

### Requirement 8: NavigationBar Shell

**Objective:** As a frontend developer, I want a NavigationBar shell component, so that both the public website and client portal can compose site navigation from a consistent branded base without reimplementing the visual structure.

#### Acceptance Criteria
1. The Design System shall provide a NavigationBar shell with a slot for the brand logo, a slot for navigation links, and a slot for a right-side action element (such as a CTA button or user account menu).
2. The Design System shall render the NavigationBar with the brand charcoal-black background and text/icon colors that meet WCAG AA contrast against that background.
3. When the viewport is below 768px wide, the NavigationBar shall hide expanded navigation links and display a menu toggle control in their place.
4. The Design System shall not include route-awareness, active-link detection, or application-specific navigation items within the NavigationBar shell.

---

### Requirement 9: Footer Shell

**Objective:** As a frontend developer, I want a Footer shell component, so that site-level footers on both the public website and portal share the same branded base structure.

#### Acceptance Criteria
1. The Design System shall provide a Footer shell with a multi-column content slot and a bottom bar slot for legal or copyright text.
2. The Design System shall render the Footer with the brand charcoal-black background and text colors that meet WCAG AA contrast.
3. The Design System shall not include application-specific links, contact information, or legal disclaimers within the Footer shell component.

---

### Requirement 10: Brand Divider

**Objective:** As a frontend developer, I want a branded horizontal divider, so that section separators consistently use the champagne-gold hairline treatment defined in the Benaribi visual identity.

#### Acceptance Criteria
1. The Design System shall provide a Divider component that renders a horizontal rule in the brand champagne-gold color.
2. The Design System shall provide two width configurations for the Divider: full-width and centered at a configurable maximum width.

---

### Requirement 11: Logo and Isotipo

**Objective:** As a frontend developer, I want the Benaribi brand mark (isotipo and full logo) as a reusable vector component, so that the logo renders crisply at all sizes without format inconsistencies.

#### Acceptance Criteria
1. The Design System shall provide the arco de herradura isotipo as a reusable vector component with a configurable fill color (defaulting to champagne-gold) and configurable size.
2. The Design System shall provide a full Logo component that pairs the isotipo with the wordmark "Benaribi Agence" in brand typography.
3. When the isotipo is rendered at 16×16 pixels, the arch silhouette shall remain visually distinguishable.

---

### Requirement 12: Dark Overlay Utility

**Objective:** As a frontend developer, I want a dark overlay utility for hero photography, so that text overlaid on images remains legible while preserving the premium dark aesthetic.

#### Acceptance Criteria
1. The Design System shall provide a DarkOverlay component that applies a semi-transparent dark gradient layer over a background image.
2. When a DarkOverlay is applied, the resulting contrast between white headline text and the darkened area shall meet WCAG AA large text standard (minimum 3:1).

---

### Requirement 13: Geometric Pattern

**Objective:** As a frontend developer, I want a geometric decorative pattern derived from the arco de herradura motif, so that backgrounds and section separators can reference the brand identity without requiring photographic assets.

#### Acceptance Criteria
1. The Design System shall provide a GeometricPattern component that renders the brand-derived geometric motif as a repeating vector element.
2. The Design System shall allow the GeometricPattern's opacity and fill color to be configured, so it can serve as a subtle background texture without overpowering foreground content.

---

### Requirement 14: Badge Component

**Objective:** As a frontend developer, I want a Badge component for categorical and status labels, so that property statuses and operation state indicators have consistent visual treatment.

#### Acceptance Criteria
1. The Design System shall provide a Badge component with at least three semantic color variants: positive/success (using brand teal), neutral/default (using marble-grey), and attention/highlight (using champagne-gold).
2. The Design System shall render Badge text at a legible size with a contrast ratio that meets WCAG AA for normal text (minimum 4.5:1).

---

### Requirement 15: WCAG AA Accessibility

**Objective:** As a user with visual impairments, I want all components to meet minimum accessibility standards, so that the platform is usable regardless of visual ability.

#### Acceptance Criteria
1. The Design System shall ensure all text/background color combinations in brand components achieve a minimum contrast ratio of 4.5:1 for normal text (WCAG 2.1 AA).
2. The Design System shall ensure heading-size and large text color combinations achieve a minimum contrast ratio of 3:1 (WCAG 2.1 AA large text).
3. The Design System shall ensure all interactive components (Button, Input, Textarea, and links) have a visible focus indicator that meets WCAG 2.1 AA focus visibility requirements.
4. If an error or warning state is conveyed through color, the Design System shall also provide a non-color indicator so the state is perceivable without color vision.

---

### Requirement 16: Component Showcase

**Objective:** As a developer new to the design system, I want a visual showcase page that renders every component in every variant, so that I can inspect and verify component appearance and behavior without building a full application.

#### Acceptance Criteria
1. The Design System shall include a self-contained showcase page that renders every component listed in this specification in all defined variants and states.
2. When a developer runs the showcase locally, all components shall render without errors in a current-version desktop browser.
3. The showcase page shall display the brand color palette, typographic scale, and spacing scale alongside the component library.
