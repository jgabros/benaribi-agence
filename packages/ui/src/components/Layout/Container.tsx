import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = ({ className, children, ...props }: ContainerProps) => (
  <div
    className={cn(
      'max-w-7xl mx-auto w-full overflow-hidden',
      'px-4 sm:px-6 lg:px-8',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type { ContainerProps };
