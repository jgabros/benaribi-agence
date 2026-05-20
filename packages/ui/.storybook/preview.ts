import type { Preview } from '@storybook/react';
import '../src/tokens/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'off-white',
      values: [
        { name: 'off-white', value: '#F5F3EF' },
        { name: 'charcoal-black', value: '#1C1C1C' },
        { name: 'marble-grey', value: '#E0DDD8' },
      ],
    },
  },
};

export default preview;
