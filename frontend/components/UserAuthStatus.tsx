'use client';

import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import anime from 'animejs';
import Link from 'next/link';
import Image from 'next/image';

export default function UserAuthStatus() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        }
    });
    
    const { t } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            // Animate the user info entrance
            anime({
                targets: '.user-info',
                opacity: [0, 1],
                translateY: [10, 0],
                duration: 800,
                easing: 'easeOutExpo'
            });
        }
    }, [session]);

    const handleLogout = async () => {
        // Animate sign out button when clicked
        anime({
            targets: '.signout-btn',
            scale: [1, 0.9, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });

        // Clear the token from localStorage
        localStorage.removeItem('accessToken');

        // Sign out from NextAuth
        await signOut({ redirect: false });

        // Redirect to login page
        router.push('/login');
    };

    if (status === 'loading') {
        return (
            <div className="flex items-center space-x-2">
                <div className="loading loading-spinner loading-sm"></div>
                <span>{t('loading')}</span>
            </div>
        );
    }

    if (session && session.user) {
        return (
            <div className="dropdown dropdown-end user-info">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar placeholder"
                >
                    {session.user.avatar ? (
                        <div className="w-10 rounded-full">
                            <Image
                                src={session.user.avatar}
                                alt={session.user.name || 'User'}
                                width={32}
                                height={32}
                            />
                        </div>
                    ) : (
                        <div
                            style={{ display: 'flex' }}
                            className="bg-primary text-primary-content rounded-full w-10 items-center justify-center"
                        >
                            <span className="text-xl">
                                {session.user.name?.charAt(0).toUpperCase() ||
                                    session.user.email?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>
                <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
                >
                    <li className="menu-title px-4 py-2 font-medium">
                        {session.user.name || session.user.email}
                    </li>
                    <li>
                        <Link href="/profile" className="justify-between">
                            {t('profile')}
                            <span className="badge badge-primary badge-sm">
                                New
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings">{t('settings')}</Link>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="text-error signout-btn"
                        >
                            {t('logout')}
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <button
            onClick={() => router.push('/login')}
            className="btn btn-sm btn-primary"
        >
            {t('login')}
        </button>
    );
}
