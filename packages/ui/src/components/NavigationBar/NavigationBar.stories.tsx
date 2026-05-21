import type { Meta, StoryObj } from '@storybook/react';
import { NavigationBar } from './NavigationBar';
import { Logo } from '../Logo/Logo';
import { Button } from '../Button/Button';

const meta: Meta<typeof NavigationBar> = {
  title: 'Shell/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Structural navigation shell. Three ReactNode slots: `logo` (left), `links` (center, hidden on mobile), `action` (right, also hidden on mobile — appears in mobile panel). Mobile toggle uses `aria-expanded` / `aria-controls`. No router imports.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

const NavLinks = () => (
  <>
    {['Servicios', 'Propiedades', 'Sobre Nosotros', 'Contacto'].map((label) => (
      <a
        key={label}
        href="#"
        className="font-body text-body text-off-white/80 hover:text-champagne-gold transition-colors"
      >
        {label}
      </a>
    ))}
  </>
);

export const Default: Story = {
  render: () => (
    <NavigationBar
      logo={<Logo fill="var(--color-champagne-gold)" size={32} className="text-off-white" />}
      links={<NavLinks />}
      action={<Button size="sm">Solicitar Asesoría</Button>}
    />
  ),
};

export const WithoutAction: Story = {
  render: () => (
    <NavigationBar
      logo={<Logo fill="var(--color-champagne-gold)" size={32} className="text-off-white" />}
      links={<NavLinks />}
    />
  ),
};

export const MobileViewport: Story = {
  render: () => (
    <div className="max-w-sm">
      <NavigationBar
        logo={<Logo fill="var(--color-champagne-gold)" size={28} className="text-off-white" />}
        links={<NavLinks />}
        action={<Button size="sm">Contactar</Button>}
      />
    </div>
  ),
};
