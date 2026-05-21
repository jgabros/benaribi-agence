import type { Meta, StoryObj } from '@storybook/react';

const PALETTE = [
  { name: 'Charcoal Black', token: '--color-charcoal-black', hex: '#1C1C1C', usage: 'Body text, backgrounds, borders' },
  { name: 'Off White', token: '--color-off-white', hex: '#F5F3EF', usage: 'Page background, card surfaces, light text on dark' },
  { name: 'Champagne Gold', token: '--color-champagne-gold', hex: '#C4A35A', usage: 'Primary CTA, accents, Isotipo' },
  { name: 'Teal', token: '--color-teal', hex: '#3D8B7A', usage: 'Success badge border, teal accents' },
  { name: 'Marble Grey', token: '--color-marble-grey', hex: '#E0DDD8', usage: 'Neutral badge, input borders, subtle surfaces' },
];

const CONTRAST = [
  { pair: 'Charcoal Black on Off White', ratio: '15.38:1', level: 'AAA ✓' },
  { pair: 'Charcoal Black on Champagne Gold', ratio: '7.09:1', level: 'AA ✓ (primary button)' },
  { pair: 'Charcoal Black on Marble Grey', ratio: '12.58:1', level: 'AAA ✓ (neutral badge)' },
  { pair: 'Off White on Charcoal Black', ratio: '15.38:1', level: 'AAA ✓ (nav, footer)' },
];

const Swatch = ({ name, token, hex, usage }: typeof PALETTE[0]) => (
  <div className="flex flex-col gap-2">
    <div
      className="h-20 w-full rounded border border-charcoal-black/10"
      style={{ backgroundColor: hex }}
      title={hex}
    />
    <div>
      <p className="font-body text-body font-medium text-charcoal-black">{name}</p>
      <p className="font-body text-caption text-charcoal-black/60">{hex}</p>
      <p className="font-body text-caption text-charcoal-black/50 font-mono">{token}</p>
      <p className="font-body text-caption text-charcoal-black/50 mt-1">{usage}</p>
    </div>
  </div>
);

const PaletteStory = () => (
  <div className="p-8 bg-off-white space-y-12">
    <div>
      <h1 className="font-display text-h2 text-charcoal-black mb-2">Brand Palette</h1>
      <p className="font-body text-body text-charcoal-black/60">
        Five named brand color tokens. No extensions beyond these five are permitted (Req 1.3).
      </p>
    </div>
    <div className="grid grid-cols-5 gap-6">
      {PALETTE.map((swatch) => (
        <Swatch key={swatch.token} {...swatch} />
      ))}
    </div>
    <div>
      <h2 className="font-display text-h3 text-charcoal-black mb-4">WCAG Contrast Ratios</h2>
      <table className="w-full font-body text-body">
        <thead>
          <tr className="border-b border-marble-grey text-left">
            <th className="pb-2 font-medium">Pair</th>
            <th className="pb-2 font-medium">Ratio</th>
            <th className="pb-2 font-medium">WCAG Level</th>
          </tr>
        </thead>
        <tbody>
          {CONTRAST.map(({ pair, ratio, level }) => (
            <tr key={pair} className="border-b border-marble-grey/50">
              <td className="py-2 text-charcoal-black">{pair}</td>
              <td className="py-2 font-mono text-charcoal-black">{ratio}</td>
              <td className="py-2 text-teal">{level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Palette',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Brand color palette — five tokens, WCAG contrast ratios.' } },
  },
};

export default meta;

export const BrandPalette: StoryObj = {
  render: () => <PaletteStory />,
};
