import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Interactive/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Brand-styled text input. Error state uses icon + text (not color alone) and sets `aria-invalid` + `aria-describedby` for screen-reader accessibility.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Nombre', placeholder: 'Ingrese su nombre' },
};

export const WithValue: Story = {
  args: { label: 'Email', defaultValue: 'nombre@benaribi.ma' },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    state: 'error',
    errorMessage: 'Ingrese una dirección de email válida',
    defaultValue: 'correo@invalido',
  },
};

export const Disabled: Story = {
  args: { label: 'Campo deshabilitado', placeholder: 'No editable', disabled: true },
};
