import { useEffect, useRef } from 'react';
import anime from 'animejs';

const LoginAnimation = () => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animation = anime({
            targets: '.login-bubble',
            scale: [0, 1],
            opacity: [0, 0.3],
            translateY: [-50, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'spring(1, 80, 10, 0)',
            loop: true
        });

        return () => animation.pause();
    }, []);

    return (
        <div
            ref={elementRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className={`login-bubble absolute rounded-full bg-primary/20 backdrop-blur-sm
            ${i === 0 ? 'w-32 h-32 top-1/4 left-1/4' : ''}
            ${i === 1 ? 'w-24 h-24 top-1/3 right-1/3' : ''}
            ${i === 2 ? 'w-40 h-40 bottom-1/4 right-1/4' : ''}
            ${i === 3 ? 'w-28 h-28 top-1/2 left-1/3' : ''}
            ${i === 4 ? 'w-36 h-36 bottom-1/3 left-1/4' : ''}
          `}
                />
            ))}
        </div>
    );
};

export default LoginAnimation;
