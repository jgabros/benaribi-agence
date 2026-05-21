import { type VariantProps, cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/cn';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'min-h-[44px] min-w-[44px]',
    'rounded font-body font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-champagne-gold focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-champagne-gold text-charcoal-black hover:bg-champagne-gold/90',
        secondary: 'border border-charcoal-black text-charcoal-black hover:bg-charcoal-black/5',
        ghost: 'text-charcoal-black hover:bg-charcoal-black/5',
      },
      size: {
        sm: 'px-4 py-2 text-caption',
        default: 'px-6 py-3 text-body',
        lg: 'px-8 py-4 text-h4',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
};

export { buttonVariants };
export type { ButtonProps };
