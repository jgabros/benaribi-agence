import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Interactive/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Polymorphic CTA button with three brand-aligned variants. Renders as `<button>` or any element via `asChild`. Minimum 44×44px touch target enforced unconditionally.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    disabled: { control: 'boolean' },
    asChild: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Solicitar Asesoría' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Ver Propiedades' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Explorar' },
};

export const SmallSize: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Compacto' },
};

export const LargeSize: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Acción Principal' },
};

export const Disabled: Story = {
  args: { variant: 'primary', children: 'No disponible', disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-off-white">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#demo">Ir a la demo →</a>
    </Button>
  ),
};
