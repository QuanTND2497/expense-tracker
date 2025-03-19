'use client';

import { CookiesProvider } from 'react-cookie';
import Header from './Header';
import Sidebar from './Sidebar';
import { useParams } from 'next/navigation';

export default function Layout({
    children,
    isHeader = true
}: {
    children: React.ReactNode;
    isHeader?: boolean;
}) {
    const params = useParams();
    const locale = Array.isArray(params.locale)
        ? params.locale[0]
        : (params.locale as string);

    return (
        <CookiesProvider>
            {isHeader && <Header />}
            <div
                className="w-full h-full flex flex-col"
                style={{
                    height: !isHeader ? '100%' : 'var(--content-height)'
                }}
            >
                <div className="flex h-full w-full">
                    {/* Sidebar - only show in MainModule (when header is true) */}
                    {isHeader && <Sidebar locale={locale} />}

                    {/* Main content */}
                    <div className="flex-1 overflow-auto h-full flex items-center justify-center">
                        {children}
                    </div>
                </div>
            </div>
        </CookiesProvider>
    );
}
