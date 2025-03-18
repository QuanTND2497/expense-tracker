import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../globals.css';
import SessionProvider from '@/components/SessionProvider';
import Layout from '@/components/Layout';
import TranslationsProvider from '@/providers/TranslationsProvider';
import initTranslations from '@/app/i18n';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import { i18nNamespaces } from '@/constant/const';
import CookieProvider from '@/providers/CookieProvider';

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
            data-theme="dark"
            className="h-full"
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 to-blue-900 text-white h-full`}
            >
                <CookieProvider>
                    <SessionProvider>
                        <TranslationsProvider
                            namespaces={i18nNamespaces}
                            locale={locale}
                            resources={resources}
                        >
                            <main className="h-full w-full">
                                <Layout>{children}</Layout>
                            </main>
                        </TranslationsProvider>
                    </SessionProvider>
                </CookieProvider>
            </body>
        </html>
    );
}
