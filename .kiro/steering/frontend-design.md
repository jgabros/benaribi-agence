# Frontend Design — Steering Document
## Benaribi Agence Implementation Standards

Technical standards for building the Benaribi Agence design system and applications.
Stack: React 18 + Tailwind CSS v3 + TypeScript.

---

## Stack Rules

### React
- Functional components only. No class components.
- Props typed with TypeScript interfaces, never `any`.
- Component files: PascalCase (`Button.tsx`, `Card.tsx`).
- One component per file. Co-locate styles, types, and tests.
- Export pattern: named exports for components, default export for pages.

### Tailwind CSS v3
- Brand tokens must be defined in `tailwind.config.ts` — never hardcode hex values in className strings.
- Use `theme.extend` for brand colors, fonts, and spacing — never override Tailwind defaults directly.
- Class order: layout → sizing → spacing → typography → color → border → effect → state variants.
- Extract repeated class combinations into components — never repeat 6+ classes across files.
- Dark mode: use `class` strategy, not `media`.

### TypeScript
- Strict mode enabled (`"strict": true` in tsconfig).
- All component props explicitly typed.
- No `as any` or `@ts-ignore` without a comment explaining why.
- Enums for all variant props (e.g. `ButtonVariant`, `BadgeColor`).

---

## Component Architecture

### File structure for each component
```
src/
└── components/
    └── Button/
        ├── Button.tsx        ← component
        ├── Button.test.tsx   ← unit tests
        ├── Button.stories.tsx ← Storybook story
        └── index.ts          ← re-export
```

### Component anatomy
```tsx
// 1. Types first
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

// 2. Component
export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### cn() utility
Always use the `cn()` utility (clsx + tailwind-merge) for conditional class merging.
Never use template literals for conditional Tailwind classes.

---

## Design Token Implementation

### Tailwind config structure
```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'charcoal': '#1C1C1C',
        'off-white': '#F5F3EF',
        'champagne-gold': '#C4A35A',
        'teal': '#3D8B7A',
        'marble-grey': '#E0DDD8',
      },
      fontFamily: {
        'display': ['Cormorant Garamond', 'Georgia', 'serif'],
        'body': ['DM Sans', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // 8px grid
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
      }
    }
  }
}
```

### CSS custom properties
Define tokens as CSS custom properties in `tokens.css` for non-Tailwind contexts (WeasyPrint PDF):
```css
:root {
  --color-charcoal: #1C1C1C;
  --color-off-white: #F5F3EF;
  --color-champagne-gold: #C4A35A;
  --color-teal: #3D8B7A;
  --color-marble-grey: #E0DDD8;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
}
```

---

## Font Loading

Self-hosted fonts ONLY. Never import from Google Fonts CDN.

```css
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('../fonts/CormorantGaramond-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Font files must live in `src/fonts/` and be committed to the repository.
Required weights: Cormorant Garamond 400, 400i, 600. DM Sans 400, 500.

---

## Accessibility Requirements

- All interactive elements must have visible focus styles (never `outline: none` without replacement).
- Focus ring: `ring-2 ring-champagne-gold ring-offset-2`
- Color contrast: verify every text/background pair against WCAG AA before committing.
- Touch targets minimum 44×44px — use `min-h-[44px] min-w-[44px]`.
- Error states must use icon + text, never color alone.
- All images need descriptive `alt` text. Decorative images: `alt=""`.
- Semantic HTML first — only use `div` when no semantic element fits.

---

## Performance Standards

- No layout shift on font load — always set explicit `width` and `height` on images.
- Images: use `loading="lazy"` for below-fold, `loading="eager"` for hero only.
- Bundle size: no library over 50kb gzipped without explicit justification.
- No inline styles except for dynamic values that cannot be expressed in Tailwind.

---

## What to avoid
- `!important` in any CSS — fix specificity instead.
- Inline `style={{}}` for static values — use Tailwind classes.
- Magic numbers — all spacing and sizing from the 8px grid.
- Pixel-perfect obsession over semantic correctness.
- Copying component code from external UI libraries (shadcn exceptions allowed if stripped to essentials).
