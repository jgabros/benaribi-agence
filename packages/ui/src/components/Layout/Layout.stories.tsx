import type { Meta, StoryObj } from '@storybook/react';
import { SectionWrapper } from './SectionWrapper';
import { Container } from './Container';

const meta: Meta = {
  title: 'Layout/Primitives',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Layout primitives: `SectionWrapper` provides consistent vertical rhythm (`py-16 md:py-24`). `Container` caps width at 1280px with responsive gutters and `overflow-hidden` to prevent horizontal scroll.',
      },
    },
  },
};

export default meta;

export const SectionWrapperDefault: StoryObj = {
  name: 'SectionWrapper — default',
  render: () => (
    <SectionWrapper className="bg-marble-grey">
      <p className="font-body text-charcoal-black">Section content with py-16 md:py-24</p>
    </SectionWrapper>
  ),
};

export const SectionWrapperAsArticle: StoryObj = {
  name: 'SectionWrapper — as article',
  render: () => (
    <SectionWrapper as="article" className="bg-off-white">
      <p className="font-body text-charcoal-black">Renders as &lt;article&gt;</p>
    </SectionWrapper>
  ),
};

export const ContainerDefault: StoryObj = {
  name: 'Container — max-width + gutters',
  render: () => (
    <div className="bg-marble-grey">
      <Container className="bg-off-white py-8">
        <p className="font-body text-charcoal-black">
          Max-width 1280px, centered, responsive horizontal padding.
        </p>
      </Container>
    </div>
  ),
};

export const Combined: StoryObj = {
  name: 'SectionWrapper + Container — typical page section',
  render: () => (
    <SectionWrapper className="bg-charcoal-black">
      <Container>
        <h2 className="font-display text-h2 text-off-white mb-4">Propiedades Destacadas</h2>
        <p className="font-body text-body text-marble-grey">
          Contenido de la sección con layout completo.
        </p>
      </Container>
    </SectionWrapper>
  ),
};
