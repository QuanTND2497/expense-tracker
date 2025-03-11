'use client';

import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useEffect } from 'react';
import anime from 'animejs';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { data: session, status } = useSession();
    const { t } = useTranslation();
    const pathname = usePathname();

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

    const handleSignOut = async () => {
        // Animate sign out button when clicked
        anime({
            targets: '.signout-btn',
            scale: [1, 0.9, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });

        await signOut({ redirect: true, callbackUrl: '/login' });
    };

    return (
        pathname !== '/login' &&
        pathname !== '/signup' && (
            <header className="header-container">
                <div className="navbar bg-base-300/50 backdrop-blur-md shadow-lg">
                    <div className="navbar-start">
                        <Link href="/" className="btn btn-ghost text-xl gap-2">
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
                            {t('expenseTracker')}
                        </Link>
                    </div>

                    <div className="navbar-end">
                        {status === 'loading' && (
                            <span className="loading loading-spinner loading-md text-primary"></span>
                        )}

                        {status === 'authenticated' && session?.user && (
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar placeholder"
                                >
                                    <div
                                        style={{
                                            display: 'flex'
                                        }}
                                        className="bg-primary text-primary-content rounded-full w-10 items-center justify-center"
                                    >
                                        <span className="text-xl">
                                            {session.user.name
                                                ?.charAt(0)
                                                .toUpperCase() ||
                                                session.user.email
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
                                >
                                    <li className="menu-title px-4 py-2 font-medium">
                                        {session.user.name ||
                                            session.user.email}
                                    </li>
                                    <li>
                                        <Link
                                            href="/profile"
                                            className="justify-between"
                                        >
                                            {t('profile')}
                                            <span className="badge badge-primary badge-sm">
                                                New
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/settings">
                                            {t('settings')}
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleSignOut}
                                            className="text-error"
                                        >
                                            {t('signOut')}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {status === 'unauthenticated' && (
                            <Link
                                href="/login"
                                className="btn btn-primary btn-sm"
                            >
                                {t('signIn')}
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        )
    );
}
