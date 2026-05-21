import type { Meta, StoryObj } from '@storybook/react';

const TYPE_SCALE = [
  { step: 'display', size: '3.5rem / 56px', token: '--text-display', family: 'Cormorant Garamond', sample: 'Villa Marrakech' },
  { step: 'h1', size: '2.5rem / 40px', token: '--text-h1', family: 'Cormorant Garamond', sample: 'Inversiones Inmobiliarias' },
  { step: 'h2', size: '2rem / 32px', token: '--text-h2', family: 'Cormorant Garamond', sample: 'Servicios de Asesoría' },
  { step: 'h3', size: '1.5rem / 24px', token: '--text-h3', family: 'Cormorant Garamond', sample: 'Gestión Patrimonial' },
  { step: 'h4', size: '1.25rem / 20px', token: '--text-h4', family: 'Cormorant Garamond', sample: 'Asesoría Fiscal' },
  { step: 'body', size: '1rem / 16px', token: '--text-body', family: 'DM Sans', sample: 'Benaribi Agence ofrece servicios exclusivos de asesoría inmobiliaria para inversores internacionales.' },
  { step: 'caption', size: '0.875rem / 14px', token: '--text-caption', family: 'DM Sans', sample: 'Condiciones y términos legales.' },
];

const TypeRow = ({ step, size, token, family, sample }: typeof TYPE_SCALE[0]) => (
  <div className="py-6 border-b border-marble-grey flex gap-8 items-baseline">
    <div className="w-32 shrink-0">
      <p className="font-body text-caption text-charcoal-black/50 font-mono">{step}</p>
      <p className="font-body text-caption text-charcoal-black/40">{size}</p>
    </div>
    <div className="flex-1">
      <p
        className={`text-charcoal-black ${
          step === 'display' ? 'font-display text-display' :
          step === 'h1' ? 'font-display text-h1' :
          step === 'h2' ? 'font-display text-h2' :
          step === 'h3' ? 'font-display text-h3' :
          step === 'h4' ? 'font-display text-h4' :
          step === 'body' ? 'font-body text-body' :
          'font-body text-caption'
        }`}
      >
        {sample}
      </p>
    </div>
    <div className="w-40 shrink-0 text-right">
      <p className="font-body text-caption text-charcoal-black/40">{family}</p>
      <p className="font-body text-caption text-charcoal-black/30 font-mono">{token}</p>
    </div>
  </div>
);

const TypographyStory = () => (
  <div className="p-8 bg-off-white">
    <div className="mb-8">
      <h1 className="font-display text-h2 text-charcoal-black mb-2">Typography Scale</h1>
      <p className="font-body text-body text-charcoal-black/60">
        Seven steps. Cormorant Garamond for display/headings, DM Sans for body/labels.
        Fonts self-hosted — no external CDN requests.
      </p>
    </div>
    {TYPE_SCALE.map((row) => (
      <TypeRow key={row.step} {...row} />
    ))}
    <div className="mt-8 grid grid-cols-2 gap-8">
      <div className="space-y-2">
        <h3 className="font-body text-caption font-medium text-charcoal-black/50 uppercase tracking-wider">
          Cormorant Garamond — Weights
        </h3>
        <p className="font-display text-h3 font-normal text-charcoal-black">Regular 400</p>
        <p className="font-display text-h3 italic text-charcoal-black">Italic 400</p>
        <p className="font-display text-h3 font-bold text-charcoal-black">Bold 700</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-body text-caption font-medium text-charcoal-black/50 uppercase tracking-wider">
          DM Sans — Weights
        </h3>
        <p className="font-body text-body font-normal text-charcoal-black">Regular 400</p>
        <p className="font-body text-body font-medium text-charcoal-black">Medium 500</p>
      </div>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Seven-step type scale with self-hosted Cormorant Garamond and DM Sans. Verifies font loading and scale rendering (Req 2.1–2.3, 16.3).',
      },
    },
  },
};

export default meta;

export const TypeScale: StoryObj = {
  render: () => <TypographyStory />,
};
