import type { Meta, StoryObj } from '@storybook/react';
import { DarkOverlay } from './DarkOverlay';

const meta: Meta<typeof DarkOverlay> = {
  title: 'Brand/DarkOverlay',
  component: DarkOverlay,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Absolute dark gradient overlay for hero images. Default `opacity={0.6}` is the minimum that ensures ≥3:1 WCAG AA contrast for large white text against charcoal-black. Do not lower the default.',
      },
    },
  },
  argTypes: {
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof DarkOverlay>;

export const Default: Story = {
  render: (args) => (
    <div className="relative h-64 overflow-hidden rounded">
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=256&fit=crop"
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <DarkOverlay {...args} />
      <div className="absolute bottom-6 left-6">
        <h2 className="font-display text-h2 text-off-white">Benaribi Agence</h2>
        <p className="font-body text-body text-marble-grey">Asesoría Inmobiliaria de Lujo</p>
      </div>
    </div>
  ),
  args: { opacity: 0.6 },
};

export const LightOverlay: Story = {
  render: (args) => (
    <div className="relative h-48 overflow-hidden rounded">
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=192&fit=crop"
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <DarkOverlay {...args} />
    </div>
  ),
  args: { opacity: 0.3 },
};
