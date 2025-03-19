'use client';

import { ReactNode, useState, useEffect, InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: string;
    icon?: ReactNode;
    helper?: string;
    fullWidth?: boolean;
    required?: boolean;
}

export default function FormField({
    label,
    name,
    error,
    icon,
    helper,
    fullWidth = true,
    required = false,
    type = 'text',
    className = '',
    ...props
}: FormFieldProps) {
    const [mounted, setMounted] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const inputId = `field-${name}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
        <div className={`form-control ${fullWidth ? 'w-full' : ''} mb-4`}>
            <label htmlFor={inputId} className="label">
                <span className="label-text font-medium">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </span>
            </label>

            <div className={`relative ${hasFocus ? 'focused' : ''}`}>
                <input
                    id={inputId}
                    name={name}
                    type={type}
                    className={`input input-bordered w-full ${
                        error ? 'input-error' : ''
                    } ${icon ? 'pl-10' : ''} ${className}`}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={`${error ? errorId : ''} ${
                        helper ? helperId : ''
                    }`}
                    required={required}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    {...props}
                />

                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/60">
                        {icon}
                    </div>
                )}
            </div>

            {error && (
                <div id={errorId} className="text-error text-sm mt-1">
                    {error}
                </div>
            )}

            {helper && !error && (
                <div
                    id={helperId}
                    className="text-base-content/60 text-sm mt-1"
                >
                    {helper}
                </div>
            )}
        </div>
    );
}
