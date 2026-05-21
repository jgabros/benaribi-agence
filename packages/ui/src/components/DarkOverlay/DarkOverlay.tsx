import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface DarkOverlayProps extends HTMLAttributes<HTMLDivElement> {
  opacity?: number;
}

export const DarkOverlay = ({
  opacity = 0.6,
  className,
  style,
  ...props
}: DarkOverlayProps) => {
  // Clamp to [0, 1]; warn in development for out-of-range values
  const clamped = Math.min(1, Math.max(0, opacity));
  if (process.env.NODE_ENV !== 'production' && (opacity < 0 || opacity > 1)) {
    console.warn(`DarkOverlay: opacity ${opacity} out of range [0, 1], clamped to ${clamped}`);
  }

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        background: `linear-gradient(to bottom, transparent 0%, rgba(28,28,28,${clamped}) 100%)`,
        ...style,
      }}
      {...props}
    />
  );
};

export type { DarkOverlayProps };
