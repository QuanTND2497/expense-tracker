'use client';

import { ReactNode, ButtonHTMLAttributes, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?:
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'neutral'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
        | 'ghost'
        | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    loadingText?: string;
    fullWidth?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    ripple?: boolean;
    withTransition?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loadingText,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    ripple = true,
    withTransition = true,
    className = '',
    onClick,
    ...props
}: ButtonProps) {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [rippleElements, setRippleElements] = useState<HTMLSpanElement[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ripple || !mounted) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const rippleElement = document.createElement('span');
        rippleElement.style.width = `${size}px`;
        rippleElement.style.height = `${size}px`;
        rippleElement.style.left = `${x}px`;
        rippleElement.style.top = `${y}px`;
        rippleElement.className =
            'absolute rounded-full bg-white/20 pointer-events-none';

        button.appendChild(rippleElement);
        setRippleElements((prev) => [...prev, rippleElement]);

        anime({
            targets: rippleElement,
            scale: [0, 1],
            opacity: [0.5, 0],
            duration: 600,
            easing: 'easeOutQuad',
            complete: () => {
                button.removeChild(rippleElement);
                setRippleElements((prev) =>
                    prev.filter((el) => el !== rippleElement)
                );
            }
        });
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoading) return;

        createRipple(e);
        onClick?.(e);
    };

    if (!mounted) return null;

    // Size classes
    const sizeClasses = {
        xs: 'btn-xs text-xs py-1 px-2',
        sm: 'btn-sm text-sm py-1.5 px-3',
        md: 'text-sm py-2 px-4',
        lg: 'btn-lg text-base py-2.5 px-5'
    };

    // Variant classes
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        neutral: 'btn-neutral',
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
        ghost: 'btn-ghost',
        link: 'btn-link'
    };

    return (
        <button
            className={`btn relative overflow-hidden ${
                variantClasses[variant]
            } ${sizeClasses[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${isLoading ? 'opacity-80 cursor-not-allowed' : ''} 
        ${withTransition ? 'transition-all duration-200' : ''}
        ${className}`}
            onClick={handleClick}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                    <span>{loadingText || t('loading')}</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <span className="mr-2">{icon}</span>
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <span className="ml-2">{icon}</span>
                    )}
                </>
            )}
        </button>
    );
}
