import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardImage, CardTitle, CardBody } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('has h-full class for equal-height grid support', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('h-full');
  });

  it('has bg-off-white background', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('bg-off-white');
  });
});

describe('CardImage', () => {
  it('renders an img with src and alt', () => {
    render(<CardImage src="/img.jpg" alt="Propiedad" />);
    const img = screen.getByAltText('Propiedad');
    expect(img).toHaveAttribute('src', '/img.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(<CardTitle>Título</CardTitle>);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Título');
  });

  it('renders as h2 when specified', () => {
    render(<CardTitle as="h2">Título</CardTitle>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Título');
  });
});

describe('CardBody', () => {
  it('renders body text', () => {
    render(<CardBody>Body content</CardBody>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });
});

describe('Card compound composition', () => {
  it('renders all sub-components together', () => {
    render(
      <Card>
        <CardImage src="/img.jpg" alt="Propiedad en Marrakech" />
        <CardTitle>Villa Marrakech</CardTitle>
        <CardBody>Descripción de la propiedad.</CardBody>
      </Card>
    );
    expect(screen.getByAltText('Propiedad en Marrakech')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Villa Marrakech');
    expect(screen.getByText('Descripción de la propiedad.')).toBeInTheDocument();
  });
});
