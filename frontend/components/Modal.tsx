'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import FadeTransition from './FadeTransition';
import anime from 'animejs';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    showCloseButton?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    footer?: ReactNode;
    preventClose?: boolean;
    closeOnBackdropClick?: boolean;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
    size = 'md',
    footer,
    preventClose = false,
    closeOnBackdropClick = true
}: ModalProps) {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [modalElement, setModalElement] = useState<HTMLDivElement | null>(
        null
    );

    useEffect(() => {
        setMounted(true);

        // Close on escape key
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !preventClose) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, preventClose]);

    useEffect(() => {
        if (isOpen && modalElement) {
            anime({
                targets: modalElement,
                scale: [0.9, 1],
                opacity: [0, 1],
                easing: 'easeOutQuad',
                duration: 300
            });
        }
    }, [isOpen, modalElement]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (
            e.target === e.currentTarget &&
            closeOnBackdropClick &&
            !preventClose
        ) {
            onClose();
        }
    };

    if (!mounted) return null;

    // Calculate modal size classes
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full'
    };

    return (
        <FadeTransition show={isOpen} duration={300}>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-base-300/80 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div
                    ref={setModalElement}
                    className={`bg-base-100 rounded-lg shadow-xl ${sizeClasses[size]} w-full overflow-hidden`}
                >
                    {title && (
                        <div className="flex items-center justify-between p-4 border-b border-base-content/10">
                            <h3 className="text-lg font-medium">{title}</h3>
                            {showCloseButton && !preventClose && (
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-full hover:bg-base-content/10 transition-colors"
                                    aria-label={t('close')}
                                >
                                    <IoClose className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    )}

                    <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                        {children}
                    </div>

                    {footer && (
                        <div className="flex justify-end gap-2 p-4 border-t border-base-content/10">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </FadeTransition>
    );
}
