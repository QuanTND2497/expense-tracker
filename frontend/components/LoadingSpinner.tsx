'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
    message?: string;
    fullScreen?: boolean;
}

export default function LoadingSpinner({
    message,
    fullScreen = false
}: LoadingSpinnerProps) {
    const { t } = useTranslation('common');
    const spinnerRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Only run animations after component is mounted
        if (!spinnerRef.current) return;
        
        // Animate the spinner
        anime({
            targets: spinnerRef.current,
            rotate: '360deg',
            duration: 1500,
            easing: 'linear',
            loop: true
        });

        // Animate the dots
        anime({
            targets: '.loading-dot',
            scale: [0.5, 1.2, 0.5],
            opacity: [0.4, 1, 0.4],
            translateY: [0, -10, 0],
            delay: anime.stagger(120),
            duration: 1200,
            easing: 'easeInOutSine',
            loop: true
        });

        // Animate the message text
        anime({
            targets: '.loading-text',
            opacity: [0.4, 1, 0.4],
            duration: 2000,
            easing: 'easeInOutSine',
            loop: true
        });
    }, [mounted]);

    // Don't render during SSR
    if (!mounted) return null;

    const containerClasses = fullScreen
        ? 'fixed inset-0 flex flex-col items-center justify-center bg-base-300/80 backdrop-blur-sm z-50'
        : 'flex flex-col items-center justify-center py-8';

    return (
        <div className={containerClasses}>
            <div
                ref={spinnerRef}
                className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mb-4"
            ></div>

            <div ref={dotsRef} className="flex gap-2 mb-3">
                <div className="loading-dot w-2 h-2 bg-primary rounded-full"></div>
                <div className="loading-dot w-2 h-2 bg-primary rounded-full"></div>
                <div className="loading-dot w-2 h-2 bg-primary rounded-full"></div>
            </div>

            <div className="loading-text text-lg font-medium text-primary">
                {message || t('please_wait')}
            </div>
        </div>
    );
}
