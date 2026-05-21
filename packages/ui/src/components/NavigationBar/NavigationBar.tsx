import { useState, useId } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface NavigationBarProps {
  logo: ReactNode;
  links: ReactNode;
  action?: ReactNode;
  className?: string;
}

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    aria-hidden="true"
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {isOpen ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ) : (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

export const NavigationBar = ({
  logo,
  links,
  action,
  className,
}: NavigationBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navPanelId = useId().replace(/:/g, '');

  return (
    <nav
      className={cn('bg-charcoal-black text-off-white', className)}
      aria-label="Main navigation"
    >
      {/* Desktop bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo slot */}
          <div className="shrink-0">{logo}</div>

          {/* Links slot — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">{links}</div>

          {/* Right side: action slot + mobile toggle */}
          <div className="flex items-center gap-4">
            {action && <div className="hidden md:block">{action}</div>}
            <button
              type="button"
              className={cn(
                'md:hidden inline-flex items-center justify-center',
                'min-h-[44px] min-w-[44px] rounded',
                'text-off-white',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-champagne-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-black'
              )}
              aria-expanded={isOpen}
              aria-controls={navPanelId}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel — uses HTML hidden attribute; CSS display:none is reliable
          and avoids conflict with the md:hidden responsive utility */}
      <div
        id={navPanelId}
        hidden={!isOpen}
        className="md:hidden border-t border-off-white/10"
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          {links}
          {action && <div className="pt-2 border-t border-off-white/10">{action}</div>}
        </div>
      </div>
    </nav>
  );
};

export type { NavigationBarProps };
