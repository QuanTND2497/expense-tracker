'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import anime from 'animejs';

interface LanguageLoadingOverlayProps {
    isVisible: boolean;
}

export default function LanguageLoadingOverlay({
    isVisible
}: LanguageLoadingOverlayProps) {
    const { t } = useTranslation('common');
    const [dots, setDots] = useState('');
    const [mounted, setMounted] = useState(false);

    // Set mounted state after component mounts
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !isVisible) return;

        // Animate the logo
        anime({
            targets: '.language-logo',
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
            duration: 2000,
            easing: 'easeInOutQuad',
            loop: true
        });

        // Animate the loading dots
        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev.length >= 3) return '';
                return prev + '.';
            });
        }, 400);

        return () => clearInterval(interval);
    }, [isVisible, mounted]);

    // Don't render anything during SSR
    if (!mounted) return null;
    
    // Don't render if not visible
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-base-300/90 backdrop-blur-sm flex flex-col items-center justify-center z-[100]"
        >
            <div className="language-logo text-6xl mb-6">🌐</div>
            <h2 className="text-2xl font-bold text-primary mb-2">
                {t('language')}
            </h2>
            <p className="text-lg mb-8">
                {t('processing')}
                {dots}
            </p>

            <div className="w-64 h-2 bg-base-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="h-full bg-primary"
                />
            </div>
        </motion.div>
    );
}
