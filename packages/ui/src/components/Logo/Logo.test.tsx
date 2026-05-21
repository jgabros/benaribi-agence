import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Isotipo } from './Isotipo';
import { Logo } from './Logo';

describe('Isotipo', () => {
  it('renders an SVG', () => {
    const { container } = render(<Isotipo />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('uses default size of 40', () => {
    const { container } = render(<Isotipo />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '40');
    expect(svg).toHaveAttribute('height', '40');
  });

  it('accepts custom size', () => {
    const { container } = render(<Isotipo size={16} />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
  });

  it('uses default champagne-gold fill', () => {
    const { container } = render(<Isotipo />);
    const path = container.querySelector('path')!;
    expect(path).toHaveAttribute('fill', 'var(--color-champagne-gold)');
  });

  it('accepts custom fill', () => {
    const { container } = render(<Isotipo fill="#ffffff" />);
    expect(container.querySelector('path')!).toHaveAttribute('fill', '#ffffff');
  });

  it('is aria-hidden for decorative use', () => {
    const { container } = render(<Isotipo />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders at size 16 without crashing (legibility check)', () => {
    const { container } = render(<Isotipo size={16} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

describe('Logo', () => {
  it('contains the Isotipo SVG', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('contains the Benaribi Agence wordmark', () => {
    render(<Logo />);
    expect(screen.getByText('Benaribi Agence')).toBeInTheDocument();
  });

  it('forwards fill to Isotipo', () => {
    const { container } = render(<Logo fill="#ffffff" />);
    expect(container.querySelector('path')!).toHaveAttribute('fill', '#ffffff');
  });
});
