import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../globals.css';
import SessionProvider from '@/providers/SessionProvider';
import Layout from '@/components/Layout';
import TranslationsProvider from '@/providers/TranslationsProvider';
import initTranslations from '@/app/i18n';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import { i18nNamespaces } from '@/constant/const';
import CookieProvider from '@/providers/CookieProvider';
import Script from 'next/script';
import { ToastProvider } from '@/providers/ToastProvider';
import { PageLoadingProvider } from '@/providers/PageLoadingProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Expense Tracker',
    description: 'Track your expenses easily'
};
export function generateStaticParams() {
    return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;
    const { resources } = await initTranslations(locale);

    return (
        <html
            lang={locale}
            dir={dir(locale)}
            className="h-full"
            suppressHydrationWarning
        >
            <head>
                <Script id="theme-script" strategy="beforeInteractive">
                    {`
                    (function() {
                        try {
                            const savedTheme = localStorage.getItem('theme');
                            if (savedTheme) {
                                document.documentElement.setAttribute('data-theme', savedTheme);
                            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                                document.documentElement.setAttribute('data-theme', 'light');
                            } else {
                                document.documentElement.setAttribute('data-theme', 'dark');
                            }
                        } catch (e) {
                            console.error('Error applying theme:', e);
                            document.documentElement.setAttribute('data-theme', 'dark');
                        }
                    })();
                    `}
                </Script>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
                suppressHydrationWarning
            >
                <CookieProvider>
                    <SessionProvider>
                        <TranslationsProvider
                            namespaces={i18nNamespaces}
                            locale={locale}
                            resources={resources}
                        >
                            <PageLoadingProvider>
                                <ToastProvider>
                                    <main className="h-full w-full">
                                        <Layout>{children}</Layout>
                                    </main>
                                </ToastProvider>
                            </PageLoadingProvider>
                        </TranslationsProvider>
                    </SessionProvider>
                </CookieProvider>
            </body>
        </html>
    );
}
