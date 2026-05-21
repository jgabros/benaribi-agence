import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const dividerVariants = cva('block bg-champagne-gold h-px', {
  variants: {
    variant: {
      full: 'w-full',
      centered: 'mx-auto',
    },
  },
  defaultVariants: { variant: 'full' },
});

interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof dividerVariants> {
  maxWidth?: string;
}

export const Divider = ({ className, variant, maxWidth, style, ...props }: DividerProps) => (
  <hr
    className={cn(dividerVariants({ variant }), className)}
    style={variant === 'centered' && maxWidth ? { maxWidth, ...style } : style}
    {...props}
  />
);

export { dividerVariants };
export type { DividerProps };
