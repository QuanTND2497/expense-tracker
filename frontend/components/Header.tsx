'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import anime from 'animejs';
import { usePathname } from 'next/navigation';
import UserAuthStatus from './UserAuthStatus';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
    const pathname = usePathname();
    const { t } = useTranslation();
    useEffect(() => {
        // Animate header entrance
        anime({
            targets: '.header-container',
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });
    }, []);

    return (
        pathname !== '/login' &&
        pathname !== '/signup' && (
            <header className="header-container h-16">
                <div className="navbar bg-gradient-to-r from-base-300/80 to-base-200/80 backdrop-blur-md shadow-lg border-b border-base-300">
                    <div className="navbar-start">
                        <Link href="/" className="btn btn-ghost text-xl gap-2 font-bold text-primary hover:text-primary-focus transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                {t('expenseTracker')}
                            </span>
                        </Link>
                    </div>

                    <div className="navbar-end flex items-center gap-2">
                        <div className="hidden sm:flex bg-base-300/50 p-1 rounded-lg border border-base-300 shadow-inner">
                            <ThemeSwitcher />
                            <div className="mx-1 h-6 w-px bg-base-content/10"></div>
                            <LanguageSwitcher />
                        </div>
                        <div className="sm:hidden flex">
                            <ThemeSwitcher />
                            <LanguageSwitcher />
                        </div>
                        <UserAuthStatus />
                    </div>
                </div>
            </header>
        )
    );
}
