import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export const SectionWrapper = ({
  as: Tag = 'section',
  className,
  children,
  ...props
}: SectionWrapperProps) => (
  <Tag className={cn('py-16 md:py-24', className)} {...props}>
    {children}
  </Tag>
);

export type { SectionWrapperProps };
