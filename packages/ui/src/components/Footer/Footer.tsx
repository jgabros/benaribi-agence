import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface FooterProps {
  columns: ReactNode;
  bottomBar?: ReactNode;
  className?: string;
}

export const Footer = ({ columns, bottomBar, className }: FooterProps) => (
  <footer className={cn('bg-charcoal-black text-off-white', className)}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {columns}
    </div>
    {bottomBar && (
      <div className="border-t border-off-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {bottomBar}
        </div>
      </div>
    )}
  </footer>
);

export type { FooterProps };
