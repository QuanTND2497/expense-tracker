export const languages = {
    en: {
        name: 'English',
        flag: '🇺🇸',
        dir: 'ltr'
    },
    vi: {
        name: 'Tiếng Việt',
        flag: '🇻🇳',
        dir: 'ltr'
    }
} as const;

export type Locale = keyof typeof languages;
