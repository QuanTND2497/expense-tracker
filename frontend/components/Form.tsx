'use client';

import { ReactNode, FormEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/providers/ToastProvider';
import Button from './Button';

interface FormProps {
    children: ReactNode;
    onSubmit: (data: FormData) => Promise<void> | void;
    className?: string;
    submitLabel?: string;
    submitVariant?: 'primary' | 'secondary' | 'accent' | 'success';
    resetLabel?: string;
    showReset?: boolean;
    isLoading?: boolean;
    successMessage?: string;
    errorMessage?: string;
    preventEnterSubmit?: boolean;
}

export default function Form({
    children,
    onSubmit,
    className = '',
    submitLabel,
    submitVariant = 'primary',
    resetLabel,
    showReset = false,
    isLoading = false,
    successMessage,
    errorMessage,
    preventEnterSubmit = false
}: FormProps) {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const { showToast } = useToast();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitting || isLoading) return;

        setSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            await onSubmit(formData);

            if (successMessage) {
                showToast(successMessage, 'success');
            }
        } catch (error) {
            console.error('Form error:', error);

            if (errorMessage) {
                showToast(errorMessage, 'error');
            } else {
                showToast(t('error_message'), 'error');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (
            preventEnterSubmit &&
            e.key === 'Enter' &&
            e.target instanceof HTMLElement
        ) {
            if (e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        }
    };

    if (!mounted) return null;

    return (
        <form
            onSubmit={handleSubmit}
            className={className}
            onKeyDown={handleKeyDown}
            noValidate
        >
            {children}

            <div className="flex gap-3 mt-6">
                <Button
                    type="submit"
                    variant={submitVariant}
                    isLoading={submitting || isLoading}
                    loadingText={t('processing')}
                >
                    {submitLabel || t('submit')}
                </Button>

                {showReset && (
                    <Button
                        type="reset"
                        variant="ghost"
                        disabled={submitting || isLoading}
                    >
                        {resetLabel || t('cancel')}
                    </Button>
                )}
            </div>
        </form>
    );
}
