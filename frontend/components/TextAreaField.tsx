'use client';

import { ReactNode, useState, useEffect, TextareaHTMLAttributes } from 'react';

interface TextAreaFieldProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    error?: string;
    icon?: ReactNode;
    helper?: string;
    fullWidth?: boolean;
    required?: boolean;
}

export default function TextAreaField({
    label,
    name,
    error,
    icon,
    helper,
    fullWidth = true,
    required = false,
    rows = 4,
    className = '',
    ...props
}: TextAreaFieldProps) {
    const [mounted, setMounted] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const textareaId = `field-${name}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    return (
        <div className={`form-control ${fullWidth ? 'w-full' : ''} mb-4`}>
            <label htmlFor={textareaId} className="label">
                <span className="label-text font-medium">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </span>
            </label>

            <div className={`relative ${hasFocus ? 'focused' : ''}`}>
                <textarea
                    id={textareaId}
                    name={name}
                    rows={rows}
                    className={`textarea textarea-bordered w-full ${
                        error ? 'textarea-error' : ''
                    } ${icon ? 'pl-10 pt-3' : ''} ${className}`}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={`${error ? errorId : ''} ${
                        helper ? helperId : ''
                    }`}
                    required={required}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    {...props}
                ></textarea>

                {icon && (
                    <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none text-base-content/60">
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
