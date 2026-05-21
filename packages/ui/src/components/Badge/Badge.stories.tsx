import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Interactive/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Semantic status/category label. All three variants pass WCAG AA 4.5:1 for normal text at caption size (14px). `success` uses a bordered style because solid teal fill fails AA contrast.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['success', 'neutral', 'highlight'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = {
  args: { variant: 'success', children: 'Disponible' },
};

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'En revisión' },
};

export const Highlight: Story = {
  args: { variant: 'highlight', children: 'Destacado' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-off-white">
      <Badge variant="success">Disponible</Badge>
      <Badge variant="neutral">En revisión</Badge>
      <Badge variant="highlight">Destacado</Badge>
    </div>
  ),
};
