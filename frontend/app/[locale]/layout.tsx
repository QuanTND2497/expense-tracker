import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';
import Header from '@/components/Header';
import TranslationsProvider from '@/components/TranslationsProvider';
import { i18nNamespaces } from './page';
import initTranslations from '../i18n';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

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
        <html lang={locale} data-theme="dark" className="h-full">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 to-blue-900 text-white h-full`}
            >
                <SessionProvider>
                    <TranslationsProvider
                        locale={locale}
                        namespaces={i18nNamespaces}
                        resources={resources}
                    >
                        <Header />
                        <main className="flex flex-col items-center justify-center h-full w-full mx-auto container">
                            {children}
                        </main>
                    </TranslationsProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
