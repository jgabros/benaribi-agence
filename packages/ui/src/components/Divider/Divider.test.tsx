import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders an hr element', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('applies champagne-gold background', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')!.className).toContain('bg-champagne-gold');
  });

  it('is full width by default', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')!.className).toContain('w-full');
  });

  it('renders centered variant with mx-auto', () => {
    const { container } = render(<Divider variant="centered" />);
    expect(container.querySelector('hr')!.className).toContain('mx-auto');
  });

  it('applies maxWidth as inline style when centered', () => {
    const { container } = render(<Divider variant="centered" maxWidth="120px" />);
    expect(container.querySelector('hr')!).toHaveStyle({ maxWidth: '120px' });
  });

  it('does not apply maxWidth style when full variant', () => {
    const { container } = render(<Divider variant="full" maxWidth="120px" />);
    expect(container.querySelector('hr')!).not.toHaveStyle({ maxWidth: '120px' });
  });
});
