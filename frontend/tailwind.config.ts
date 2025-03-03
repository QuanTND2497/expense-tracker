import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                accent: 'var(--accent)',
                neutral: 'var(--neutral)',
                'base-100': 'var(--base-100)',
                'base-200': 'var(--base-200)',
                'base-300': 'var(--base-300)'
            }
        }
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                dark: {
                    primary: '#6419E6',
                    'primary-focus': '#5415C6',
                    'primary-content': '#ffffff',
                    secondary: '#D926A9',
                    'secondary-focus': '#C2239B',
                    'secondary-content': '#ffffff',
                    accent: '#1FB2A6',
                    'accent-focus': '#1A9E94',
                    'accent-content': '#ffffff',
                    neutral: '#2A303C',
                    'neutral-focus': '#242B38',
                    'neutral-content': '#ffffff',
                    'base-100': '#1D232A',
                    'base-200': '#191E24',
                    'base-300': '#15191E',
                    'base-content': '#A6ADBB'
                }
            }
        ],
        darkTheme: 'dark',
        base: true,
        styled: true,
        utils: true,
        prefix: '',
        logs: false
    }
} satisfies Config;

export default config;
