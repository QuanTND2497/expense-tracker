'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import anime from 'animejs';
import { signIn } from 'next-auth/react';

export default function AuthSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useTranslation();
    const [message, setMessage] = useState<string>(t('authenticating'));

    useEffect(() => {
        // Create loading animation
        const animation = anime({
            targets: '.loading-dot',
            scale: [1, 1.4, 1],
            opacity: [0.4, 1, 0.4],
            translateY: [0, -10, 0],
            delay: anime.stagger(200),
            duration: 1000,
            loop: true,
            easing: 'easeInOutSine'
        });

        const token = searchParams.get('token');

        if (token) {
            // Sign in with NextAuth using the token
            signIn('credentials', {
                token,
                redirect: false
            })
                .then((result) => {
                    console.log('result', result);
                    if (result?.error) {
                        console.error('NextAuth sign in error:', result.error);
                        setMessage(t('authenticationFailed'));
                        router.push('/login');
                    } else {
                        setMessage(t('loginSuccessful'));
                        router.push('/');
                    }
                })
                .catch((error) => {
                    console.error('NextAuth sign in exception:', error);
                    setMessage(t('authenticationFailed'));
                    router.push('/login');
                });
        } else {
            setMessage(t('authenticationFailed'));
            router.push('/login');
        }

        return () => {
            animation.pause();
        };
    }, [router, searchParams, t]);

    return (
        <div className="w-full h-full bg-base-200 flex items-center justify-center mt-5 mb-5">
            <div className="card bg-base-100 shadow-xl max-w-md w-full">
                <div className="card-body text-center">
                    <h2 className="card-title text-2xl justify-center mb-6">
                        {message}
                    </h2>

                    <div className="flex justify-center space-x-2 my-4">
                        <div className="loading-dot w-4 h-4 rounded-full bg-primary"></div>
                        <div className="loading-dot w-4 h-4 rounded-full bg-primary"></div>
                        <div className="loading-dot w-4 h-4 rounded-full bg-primary"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
