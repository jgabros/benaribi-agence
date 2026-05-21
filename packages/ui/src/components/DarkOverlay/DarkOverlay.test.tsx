import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DarkOverlay } from './DarkOverlay';

describe('DarkOverlay', () => {
  it('renders as an absolutely positioned div', () => {
    const { container } = render(<DarkOverlay />);
    expect(container.firstChild).toHaveClass('absolute');
    expect(container.firstChild).toHaveClass('inset-0');
    expect(container.firstChild).toHaveClass('pointer-events-none');
  });

  it('uses default opacity 0.6 in gradient', () => {
    const { container } = render(<DarkOverlay />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.background).toContain('rgba(28,28,28,0.6)');
  });

  it('uses custom opacity in gradient', () => {
    const { container } = render(<DarkOverlay opacity={0.8} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.background).toContain('rgba(28,28,28,0.8)');
  });

  it('clamps opacity above 1', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<DarkOverlay opacity={1.5} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.background).toContain('rgba(28,28,28,1)');
    consoleSpy.mockRestore();
  });

  it('clamps opacity below 0', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<DarkOverlay opacity={-0.1} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.background).toContain('rgba(28,28,28,0)');
    consoleSpy.mockRestore();
  });
});
