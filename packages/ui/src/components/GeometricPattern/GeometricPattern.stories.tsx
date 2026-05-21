import type { Meta, StoryObj } from '@storybook/react';
import { GeometricPattern } from './GeometricPattern';

const meta: Meta<typeof GeometricPattern> = {
  title: 'Brand/GeometricPattern',
  component: GeometricPattern,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Repeating arco de herradura (Moorish arch) vector motif. Renders as inline SVG — zero network requests. Use as decorative background element. Configure `opacity` and `fill` for different contexts.',
      },
    },
  },
  argTypes: {
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    fill: { control: 'color' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof GeometricPattern>;

export const Default: Story = {
  args: { opacity: 0.1, fill: 'var(--color-champagne-gold)', width: 400, height: 200 },
  decorators: [(Story) => <div className="bg-charcoal-black p-4 rounded"><Story /></div>],
};

export const OnOffWhite: Story = {
  args: { opacity: 0.15, fill: 'var(--color-charcoal-black)', width: 400, height: 200 },
  decorators: [(Story) => <div className="bg-off-white p-4 rounded"><Story /></div>],
};

export const AsHeroTexture: Story = {
  render: () => (
    <div className="relative bg-charcoal-black h-48 rounded overflow-hidden flex items-center justify-center">
      <GeometricPattern
        opacity={0.08}
        fill="var(--color-champagne-gold)"
        width={800}
        height={192}
        className="absolute inset-0"
      />
      <h2 className="relative font-display text-h2 text-off-white">Benaribi Agence</h2>
    </div>
  ),
};
