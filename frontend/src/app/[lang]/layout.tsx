import './globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
    title: 'Expense Tracker',
    description: 'Track your expenses with ease'
};

export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    let messages;
    try {
        messages = (await import(`../messages/${locale}.json`)).default;
    } catch {}

    return (
        <html lang={locale} data-theme="dark">
            <body className="min-h-screen bg-base-100 text-base-content">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
