import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Interactive/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multiline brand-styled textarea. Follows the same state machine as Input: error state requires icon + text (non-color-only) and full ARIA error linkage.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Mensaje',
    placeholder: 'Cuéntenos sobre su proyecto inmobiliario…',
    rows: 4,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Mensaje',
    state: 'error',
    errorMessage: 'Por favor incluya una descripción de al menos 20 caracteres',
    defaultValue: 'Hola',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo deshabilitado',
    placeholder: 'No editable',
    disabled: true,
    rows: 3,
  },
};
