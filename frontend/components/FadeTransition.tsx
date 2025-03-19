'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface FadeTransitionProps {
    children: ReactNode;
    show: boolean;
    duration?: number;
    className?: string;
    onExited?: () => void;
}

export default function FadeTransition({
    children,
    show,
    duration = 300,
    className = '',
    onExited
}: FadeTransitionProps) {
    const [mounted, setMounted] = useState(false);
    const [shouldRender, setShouldRender] = useState(show);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        if (show) {
            setShouldRender(true);
        } else if (elementRef.current) {
            anime({
                targets: elementRef.current,
                opacity: 0,
                duration: duration,
                easing: 'easeOutQuad',
                complete: () => {
                    setShouldRender(false);
                    onExited?.();
                }
            });
        }
    }, [show, duration, onExited, mounted]);

    useEffect(() => {
        if (!mounted || !shouldRender || !elementRef.current || !show) return;

        anime({
            targets: elementRef.current,
            opacity: [0, 1],
            duration: duration,
            easing: 'easeInQuad'
        });
    }, [shouldRender, duration, show, mounted]);

    if (!mounted || !shouldRender) return null;

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}
