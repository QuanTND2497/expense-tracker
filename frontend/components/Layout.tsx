'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            <Header />
            <div
                className="w-full h-full flex flex-col items-center justify-center mx-auto container "
                style={{
                    height:
                        pathname === '/login' || pathname === '/signup'
                            ? '100%'
                            : 'var(--header-height)'
                }}
            >
                {children}
            </div>
        </>
    );
}
