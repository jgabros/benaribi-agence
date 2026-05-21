import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Brand/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Champagne-gold horizontal rule. Two variants: `full` (edge-to-edge) and `centered` (with optional `maxWidth`).',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['full', 'centered'] },
    maxWidth: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Full: Story = {
  args: { variant: 'full' },
  decorators: [(Story) => <div className="p-8 bg-off-white"><Story /></div>],
};

export const Centered: Story = {
  args: { variant: 'centered', maxWidth: '80px' },
  decorators: [(Story) => <div className="p-8 bg-off-white"><Story /></div>],
};

export const BetweenContent: Story = {
  render: () => (
    <div className="p-8 bg-off-white space-y-8">
      <h2 className="font-display text-h2 text-charcoal-black">Servicios</h2>
      <Divider variant="centered" maxWidth="60px" />
      <p className="font-body text-body text-charcoal-black/80">
        Asesoría inmobiliaria de lujo para inversores internacionales.
      </p>
    </div>
  ),
};
