import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavigationBar } from './NavigationBar';

const defaultProps = {
  logo: <span>Logo</span>,
  links: <a href="/about">Sobre Nosotros</a>,
  action: <button>Contactar</button>,
};

describe('NavigationBar', () => {
  it('renders the logo slot', () => {
    render(<NavigationBar {...defaultProps} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders the links slot', () => {
    render(<NavigationBar {...defaultProps} />);
    expect(screen.getAllByText('Sobre Nosotros').length).toBeGreaterThan(0);
  });

  it('renders on charcoal-black background', () => {
    const { container } = render(<NavigationBar {...defaultProps} />);
    expect(container.querySelector('nav')!.className).toContain('bg-charcoal-black');
  });

  it('mobile toggle is initially closed with aria-expanded=false', () => {
    render(<NavigationBar {...defaultProps} />);
    const toggle = screen.getByRole('button', { name: /open navigation/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens mobile panel on toggle click', () => {
    render(<NavigationBar {...defaultProps} />);
    const toggle = screen.getByRole('button', { name: /open navigation/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggle has aria-controls pointing to the nav panel', () => {
    render(<NavigationBar {...defaultProps} />);
    const toggle = screen.getByRole('button', { name: /open navigation/i });
    const panelId = toggle.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId!)).toBeInTheDocument();
  });

  it('renders the mobile panel hidden by default using HTML hidden attribute', () => {
    render(<NavigationBar {...defaultProps} />);
    const toggle = screen.getByRole('button', { name: /open navigation/i });
    const panelId = toggle.getAttribute('aria-controls');
    const panel = document.getElementById(panelId!);
    expect(panel).toHaveAttribute('hidden');
  });

  it('shows mobile panel after toggle click by removing HTML hidden attribute', () => {
    render(<NavigationBar {...defaultProps} />);
    const toggle = screen.getByRole('button', { name: /open navigation/i });
    fireEvent.click(toggle);
    const panelId = toggle.getAttribute('aria-controls');
    const panel = document.getElementById(panelId!);
    expect(panel).not.toHaveAttribute('hidden');
  });

  it('has 44px minimum touch target on toggle button', () => {
    render(<NavigationBar {...defaultProps} />);
    const toggle = screen.getByRole('button', { name: /open navigation/i });
    expect(toggle.className).toContain('min-h-[44px]');
    expect(toggle.className).toContain('min-w-[44px]');
  });

  it('renders without action slot', () => {
    render(<NavigationBar logo={<span>Logo</span>} links={<a href="/">Home</a>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });
});
