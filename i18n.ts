import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['ko', 'en'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as string)) notFound();
  
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
