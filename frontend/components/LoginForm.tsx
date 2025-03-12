'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        // Animate the form entrance
        anime({
            targets: '.login-form',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result?.error) {
                setError(t('invalidCredentials'));
            } else {
                router.push('/');
            }
        } catch {
            setError(t('errorOccurred'));
        } finally {
            setLoading(false);
        }
    };
    return (
        <form className="login-form space-y-6" onSubmit={handleSubmit}>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-base-content">
                        {t('emailAddress')}
                    </span>
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-base-content">
                        {t('password')}
                    </span>
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            {error && (
                <div className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
            >
                {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                ) : (
                    t('signIn')
                )}
            </button>
        </form>
    );
}
