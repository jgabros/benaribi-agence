import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders primary variant by default', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-champagne-gold');
    expect(btn.className).toContain('text-charcoal-black');
  });

  it('renders secondary variant with border', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button').className).toContain('border-charcoal-black');
  });

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button').className).toContain('hover:bg-charcoal-black/5');
  });

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('has disabled:opacity-50 class', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button').className).toContain('disabled:opacity-50');
  });

  it('renders as anchor element with asChild', () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    const link = screen.getByRole('link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
    expect(link.className).toContain('bg-champagne-gold');
  });

  it('enforces 44px minimum touch target', () => {
    render(<Button>Touch</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('min-h-[44px]');
    expect(btn.className).toContain('min-w-[44px]');
  });

  it('has visible focus ring class', () => {
    render(<Button>Focus</Button>);
    expect(screen.getByRole('button').className).toContain('focus-visible:ring-champagne-gold');
  });
});
