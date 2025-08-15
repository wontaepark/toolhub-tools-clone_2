'use client';

import { NextIntlClientProvider } from 'next-intl';

interface IntlProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

export default function IntlProvider({ children, locale, messages }: IntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}