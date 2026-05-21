import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders neutral variant by default', () => {
    render(<Badge>Neutral</Badge>);
    expect(screen.getByText('Neutral').className).toContain('bg-marble-grey');
    expect(screen.getByText('Neutral').className).toContain('text-charcoal-black');
  });

  it('renders success variant with bordered teal pattern', () => {
    render(<Badge variant="success">Disponible</Badge>);
    const badge = screen.getByText('Disponible');
    expect(badge.className).toContain('border-teal');
    expect(badge.className).toContain('bg-off-white');
    expect(badge.className).toContain('text-charcoal-black');
  });

  it('renders highlight variant with champagne-gold fill', () => {
    render(<Badge variant="highlight">Destacado</Badge>);
    const badge = screen.getByText('Destacado');
    expect(badge.className).toContain('bg-champagne-gold');
    expect(badge.className).toContain('text-charcoal-black');
  });

  it('renders as a span element', () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText('Label').tagName).toBe('SPAN');
  });

  it('accepts additional className', () => {
    render(<Badge className="custom-class">Badge</Badge>);
    expect(screen.getByText('Badge').className).toContain('custom-class');
  });
});
