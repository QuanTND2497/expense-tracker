'use client';

import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import anime from 'animejs';

export default function SocialLoginButtons() {
    const { t } = useTranslation();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    useEffect(() => {
        // Animate the social buttons entrance
        anime({
            targets: '.social-login-button',
            opacity: [0, 1],
            translateY: [10, 0],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutExpo'
        });
    }, []);

    const handleGoogleLogin = () => {
        window.location.href = `${apiUrl}/api/auth/google`;
    };

    const handleFacebookLogin = () => {
        window.location.href = `${apiUrl}/api/auth/facebook`;
    };

    return (
        <div className="space-y-4 mb-8">
            <button
                type="button"
                className="social-login-button btn btn-outline w-full"
                onClick={handleGoogleLogin}
            >
                <FcGoogle className="text-xl" />
                {t('continueWithGoogle')}
            </button>
            <button
                type="button"
                className="social-login-button btn btn-primary w-full"
                onClick={handleFacebookLogin}
            >
                <FaFacebook className="text-xl text-white" />
                {t('continueWithFacebook')}
            </button>
        </div>
    );
} 