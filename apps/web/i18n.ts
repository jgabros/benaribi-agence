import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: Record<string, any> = (
    await import(`./messages/${locale}.json`)
  ).default;

  return {
    messages,
    onError() {
      // Silent — falls back to key via getMessageFallback
    },
    getMessageFallback({ key }: { key: string }) {
      return key;
    },
  };
});
