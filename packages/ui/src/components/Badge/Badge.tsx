import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-caption font-medium font-body',
  {
    variants: {
      variant: {
        // Bordered/outline: teal border + off-white bg + charcoal text → 15.38:1 contrast
        success: 'border border-teal bg-off-white text-charcoal-black',
        // Marble-grey fill + charcoal text → 12.58:1 contrast
        neutral: 'bg-marble-grey text-charcoal-black',
        // Champagne-gold fill + charcoal text → 7.09:1 contrast
        highlight: 'bg-champagne-gold text-charcoal-black',
      },
    },
    defaultVariants: { variant: 'neutral' },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);

export { badgeVariants };
export type { BadgeProps };
