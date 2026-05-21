import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionWrapper } from './SectionWrapper';
import { Container } from './Container';

describe('SectionWrapper', () => {
  it('renders as section by default', () => {
    render(<SectionWrapper>Content</SectionWrapper>);
    expect(screen.getByText('Content').closest('section')).toBeInTheDocument();
  });

  it('renders as a custom element via `as` prop', () => {
    render(<SectionWrapper as="article">Content</SectionWrapper>);
    expect(screen.getByText('Content').closest('article')).toBeInTheDocument();
  });

  it('applies vertical padding classes', () => {
    const { container } = render(<SectionWrapper>Content</SectionWrapper>);
    expect(container.firstChild).toHaveClass('py-16');
    expect(container.firstChild).toHaveClass('md:py-24');
  });

  it('merges additional className', () => {
    const { container } = render(<SectionWrapper className="bg-charcoal-black">Content</SectionWrapper>);
    expect(container.firstChild).toHaveClass('bg-charcoal-black');
    expect(container.firstChild).toHaveClass('py-16');
  });
});

describe('Container', () => {
  it('renders children inside a div', () => {
    render(<Container>Content</Container>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies max-width, centering, and overflow-hidden classes', () => {
    const { container } = render(<Container>Content</Container>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('max-w-7xl');
    expect(el.className).toContain('mx-auto');
    expect(el.className).toContain('overflow-hidden');
  });

  it('applies responsive horizontal padding', () => {
    const { container } = render(<Container>Content</Container>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('px-4');
    expect(el.className).toContain('sm:px-6');
    expect(el.className).toContain('lg:px-8');
  });
});
