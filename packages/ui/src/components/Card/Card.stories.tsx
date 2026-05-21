import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardImage, CardTitle, CardBody } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Content/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Compound component for structured content. `h-full` on the root enables equal-height cards in CSS grid rows. `CardImage` is optional and always renders first.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const WithImage: Story = {
  render: () => (
    <div className="max-w-sm">
      <Card>
        <CardImage src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=225&fit=crop" alt="Villa moderna en Marrakech" />
        <CardTitle>Villa Marrakech</CardTitle>
        <CardBody>
          Residencia de lujo con jardín privado y vistas al Atlas. 450m² de superficie construida.
        </CardBody>
      </Card>
    </div>
  ),
};

export const WithoutImage: Story = {
  render: () => (
    <div className="max-w-sm">
      <Card>
        <CardTitle>Asesoría Fiscal</CardTitle>
        <CardBody>
          Optimización fiscal personalizada para inversores internacionales en bienes raíces marroquíes.
        </CardBody>
      </Card>
    </div>
  ),
};

export const EqualHeightGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 max-w-4xl">
      {[
        { title: 'Villa Marrakech', body: 'Descripción corta.' },
        { title: 'Riad Fès', body: 'Descripción más larga con varios detalles sobre la propiedad y sus características principales.' },
        { title: 'Apartamento Casablanca', body: 'Texto medio.' },
      ].map((card) => (
        <Card key={card.title}>
          <CardTitle>{card.title}</CardTitle>
          <CardBody>{card.body}</CardBody>
        </Card>
      ))}
    </div>
  ),
};
