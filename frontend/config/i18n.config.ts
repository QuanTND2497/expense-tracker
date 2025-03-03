import { getRequestConfig } from 'next-intl/server';
import { languages } from './languages';

export const locales = Object.keys(languages) as Array<keyof typeof languages>;
export const defaultLocale = 'vi' as const;

export default getRequestConfig(async ({ locale }) => ({
    messages: (await import(`../messages/${locale}.json`)).default,
    locale: locale // Explicitly return the locale
}));
