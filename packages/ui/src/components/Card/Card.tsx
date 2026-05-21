import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4';
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, children, ...props }: CardProps) => (
  <div
    className={cn(
      'bg-off-white h-full rounded overflow-hidden flex flex-col',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardImage = ({ src, alt, className }: CardImageProps) => (
  <img
    src={src}
    alt={alt}
    className={cn('w-full object-cover aspect-video', className)}
    loading="lazy"
  />
);

export const CardTitle = ({
  as: Tag = 'h3',
  className,
  children,
  ...props
}: CardTitleProps) => (
  <Tag
    className={cn('font-display text-h3 text-charcoal-black px-6 pt-6', className)}
    {...props}
  >
    {children}
  </Tag>
);

export const CardBody = ({ className, children, ...props }: CardBodyProps) => (
  <div
    className={cn('font-body text-body text-charcoal-black/80 px-6 pb-6 pt-2 flex-1', className)}
    {...props}
  >
    {children}
  </div>
);

export type { CardProps, CardImageProps, CardTitleProps, CardBodyProps };
