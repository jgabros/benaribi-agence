import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders a text input by default', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with an associated label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('sets aria-invalid and aria-describedby in error state', () => {
    render(<Input state="error" errorMessage="Campo requerido" label="Email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const errorId = input.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId!)).toHaveTextContent('Campo requerido');
  });

  it('renders error icon and message in error state', () => {
    render(<Input state="error" errorMessage="Requerido" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Requerido');
  });

  it('does not render error elements in default state', () => {
    render(<Input />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('has minimum 44px height class', () => {
    render(<Input />);
    expect(screen.getByRole('textbox').className).toContain('min-h-[44px]');
  });

  it('applies champagne-gold focus ring class', () => {
    render(<Input />);
    expect(screen.getByRole('textbox').className).toContain('focus-visible:ring-champagne-gold');
  });
});
