import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GeometricPattern } from './GeometricPattern';

describe('GeometricPattern', () => {
  it('renders an SVG element', () => {
    const { container } = render(<GeometricPattern />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('uses default width and height of 400', () => {
    const { container } = render(<GeometricPattern />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '400');
    expect(svg).toHaveAttribute('height', '400');
  });

  it('accepts custom dimensions', () => {
    const { container } = render(<GeometricPattern width={200} height={100} />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '100');
  });

  it('contains a pattern element', () => {
    const { container } = render(<GeometricPattern />);
    expect(container.querySelector('pattern')).toBeInTheDocument();
  });

  it('applies fill prop to the arch path', () => {
    const { container } = render(<GeometricPattern fill="#FF0000" />);
    const path = container.querySelector('path')!;
    expect(path).toHaveAttribute('fill', '#FF0000');
  });

  it('applies opacity prop to the arch path', () => {
    const { container } = render(<GeometricPattern opacity={0.25} />);
    const path = container.querySelector('path')!;
    expect(path).toHaveAttribute('opacity', '0.25');
  });

  it('has aria-hidden for decorative role', () => {
    const { container } = render(<GeometricPattern />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
