import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with an associated label', () => {
    render(<Textarea label="Mensaje" />);
    expect(screen.getByLabelText('Mensaje')).toBeInTheDocument();
  });

  it('sets aria-invalid and aria-describedby in error state', () => {
    render(<Textarea state="error" errorMessage="Campo requerido" label="Mensaje" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    const errorId = textarea.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId!)).toHaveTextContent('Campo requerido');
  });

  it('renders error icon and message in error state', () => {
    render(<Textarea state="error" errorMessage="Requerido" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Requerido');
  });

  it('does not render error elements in default state', () => {
    render(<Textarea />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('has minimum 44px height class', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox').className).toContain('min-h-[44px]');
  });

  it('applies champagne-gold focus ring class', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox').className).toContain('focus-visible:ring-champagne-gold');
  });
});
