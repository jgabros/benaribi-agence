import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge about Benaribi custom @theme tokens so it handles
// conflict resolution correctly (e.g., text-charcoal-black vs text-body).
const twMerge = extendTailwindMerge({
  extend: {
    // Register custom font-size steps so they are grouped correctly.
    classGroups: {
      'font-size': [
        { text: ['display', 'h1', 'h2', 'h3', 'h4', 'body', 'caption'] },
      ],
    },
    // Register custom brand colors so text/bg/border/ring classes using them
    // are treated as color utilities and not confused with font-size classes.
    theme: {
      colors: ['charcoal-black', 'off-white', 'champagne-gold', 'teal', 'marble-grey'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
