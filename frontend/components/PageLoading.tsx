'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs';

export default function PageLoading() {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [barElement, setBarElement] = useState<HTMLDivElement | null>(null);
    const [dotsElement, setDotsElement] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        setMounted(true);

        if (barElement) {
            anime({
                targets: barElement,
                width: ['0%', '70%', '90%'],
                easing: 'easeInOutQuad',
                duration: 2000,
                loop: true
            });
        }

        if (dotsElement) {
            anime({
                targets: '.loading-dot',
                scale: [0.5, 1.2, 0.5],
                opacity: [0.4, 1, 0.4],
                translateY: [0, -5, 0],
                delay: anime.stagger(120),
                duration: 1200,
                easing: 'easeInOutSine',
                loop: true
            });
        }
    }, [mounted, barElement, dotsElement]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 bg-base-300/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <div className="w-64 h-1 bg-base-content/10 rounded-full overflow-hidden mb-8">
                <div
                    ref={setBarElement}
                    className="h-full bg-primary rounded-full"
                ></div>
            </div>

            <div className="text-lg font-medium text-primary mb-4">
                {t('please_wait')}
            </div>

            <div ref={setDotsElement} className="flex gap-2">
                <div className="loading-dot w-2 h-2 bg-primary rounded-full"></div>
                <div className="loading-dot w-2 h-2 bg-primary rounded-full"></div>
                <div className="loading-dot w-2 h-2 bg-primary rounded-full"></div>
            </div>
        </div>
    );
}
