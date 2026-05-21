import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';
import { Logo } from '../Logo/Logo';
import { Divider } from '../Divider/Divider';

const meta: Meta<typeof Footer> = {
  title: 'Shell/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Structural footer shell with `columns` and optional `bottomBar` ReactNode slots. Pure shell — no hardcoded links or text. Charcoal-black background ensures 15.38:1 contrast against off-white text.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const FooterColumns = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="md:col-span-2 space-y-4">
      <Logo fill="var(--color-champagne-gold)" className="text-off-white" />
      <p className="font-body text-body text-off-white/60 max-w-xs">
        Asesoría inmobiliaria de lujo para inversores internacionales en Marruecos.
      </p>
    </div>
    <div className="space-y-3">
      <h3 className="font-body text-caption font-medium text-champagne-gold uppercase tracking-wider">
        Servicios
      </h3>
      {['Adquisición', 'Gestión Patrimonial', 'Asesoría Fiscal', 'Relocalización'].map((s) => (
        <a key={s} href="#" className="block font-body text-body text-off-white/70 hover:text-champagne-gold transition-colors">
          {s}
        </a>
      ))}
    </div>
    <div className="space-y-3">
      <h3 className="font-body text-caption font-medium text-champagne-gold uppercase tracking-wider">
        Contacto
      </h3>
      <p className="font-body text-body text-off-white/70">Marrakech, Marruecos</p>
      <a href="mailto:contact@benaribi.ma" className="block font-body text-body text-off-white/70 hover:text-champagne-gold transition-colors">
        contact@benaribi.ma
      </a>
    </div>
  </div>
);

const BottomBar = () => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="font-body text-caption text-off-white/50">
      © 2026 Benaribi Agence. Todos los derechos reservados.
    </p>
    <div className="flex gap-6">
      {['Privacidad', 'Términos', 'Cookies'].map((label) => (
        <a key={label} href="#" className="font-body text-caption text-off-white/50 hover:text-champagne-gold transition-colors">
          {label}
        </a>
      ))}
    </div>
  </div>
);

export const WithBottomBar: Story = {
  render: () => (
    <Footer
      columns={<FooterColumns />}
      bottomBar={<BottomBar />}
    />
  ),
};

export const WithoutBottomBar: Story = {
  render: () => <Footer columns={<FooterColumns />} />,
};

export const MinimalShell: Story = {
  render: () => (
    <Footer
      columns={
        <div className="flex items-center justify-between">
          <Logo fill="var(--color-champagne-gold)" className="text-off-white" />
          <Divider variant="centered" maxWidth="40px" />
        </div>
      }
    />
  ),
};
