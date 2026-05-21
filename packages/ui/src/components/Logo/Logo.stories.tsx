import type { Meta, StoryObj } from '@storybook/react';
import { Isotipo } from './Isotipo';
import { Logo } from './Logo';

const meta: Meta = {
  title: 'Brand/Logo',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`Isotipo` is the arco de herradura SVG mark. `Logo` combines it with the "Benaribi Agence" wordmark in Cormorant Garamond. Both accept `fill` and `size` props for theming.',
      },
    },
  },
};

export default meta;

export const IsotipoDefault: StoryObj = {
  name: 'Isotipo — default (40px)',
  render: () => (
    <div className="p-8 bg-off-white">
      <Isotipo />
    </div>
  ),
};

export const IsotipoSmall: StoryObj = {
  name: 'Isotipo — 16px (minimum legible size)',
  render: () => (
    <div className="p-8 bg-off-white flex gap-4 items-end">
      <Isotipo size={16} />
      <Isotipo size={24} />
      <Isotipo size={32} />
      <Isotipo size={40} />
      <Isotipo size={64} />
    </div>
  ),
};

export const IsotipoOnDark: StoryObj = {
  name: 'Isotipo — on dark background',
  render: () => (
    <div className="p-8 bg-charcoal-black">
      <Isotipo fill="var(--color-off-white)" size={48} />
    </div>
  ),
};

export const LogoDefault: StoryObj = {
  name: 'Logo — default',
  render: () => (
    <div className="p-8 bg-off-white">
      <Logo />
    </div>
  ),
};

export const LogoOnDark: StoryObj = {
  name: 'Logo — on dark background',
  render: () => (
    <div className="p-8 bg-charcoal-black">
      <Logo
        fill="var(--color-off-white)"
        className="text-off-white"
      />
    </div>
  ),
};
