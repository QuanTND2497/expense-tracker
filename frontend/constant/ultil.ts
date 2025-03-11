'use client';

import { signIn } from 'next-auth/react';

export const handleGoogleSignup = async () => {
    await signIn('google', { callbackUrl: '/vi', redirect: true });
};

export const handleFacebookSignup = async () => {
    await signIn('facebook', { callbackUrl: '/vi', redirect: true });
};
