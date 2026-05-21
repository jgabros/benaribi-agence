import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders a footer element', () => {
    render(<Footer columns={<div>Columns</div>} />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the columns slot', () => {
    render(<Footer columns={<div>Column content</div>} />);
    expect(screen.getByText('Column content')).toBeInTheDocument();
  });

  it('renders the bottomBar slot when provided', () => {
    render(<Footer columns={<div>Columns</div>} bottomBar={<p>© 2026 Benaribi</p>} />);
    expect(screen.getByText('© 2026 Benaribi')).toBeInTheDocument();
  });

  it('does not render bottomBar section when not provided', () => {
    const { container } = render(<Footer columns={<div>Columns</div>} />);
    expect(container.querySelector('.border-t')).not.toBeInTheDocument();
  });

  it('has charcoal-black background', () => {
    render(<Footer columns={<div>Columns</div>} />);
    expect(screen.getByRole('contentinfo').className).toContain('bg-charcoal-black');
  });

  it('has off-white text', () => {
    render(<Footer columns={<div>Columns</div>} />);
    expect(screen.getByRole('contentinfo').className).toContain('text-off-white');
  });

  it('applies additional className', () => {
    render(<Footer columns={<div>Columns</div>} className="custom-footer" />);
    expect(screen.getByRole('contentinfo').className).toContain('custom-footer');
  });
});
