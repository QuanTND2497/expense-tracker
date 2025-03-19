'use client';

import { ReactNode, useState, useEffect, SelectHTMLAttributes } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: SelectOption[];
    error?: string;
    icon?: ReactNode;
    helper?: string;
    fullWidth?: boolean;
    required?: boolean;
    emptyOption?: string;
}

export default function SelectField({
    label,
    name,
    options,
    error,
    icon,
    helper,
    fullWidth = true,
    required = false,
    emptyOption,
    className = '',
    ...props
}: SelectFieldProps) {
    const [mounted, setMounted] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const selectId = `field-${name}`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
        <div className={`form-control ${fullWidth ? 'w-full' : ''} mb-4`}>
            <label htmlFor={selectId} className="label">
                <span className="label-text font-medium">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </span>
            </label>

            <div className={`relative ${hasFocus ? 'focused' : ''}`}>
                <select
                    id={selectId}
                    name={name}
                    className={`select select-bordered w-full ${
                        error ? 'select-error' : ''
                    } ${icon ? 'pl-10' : ''} ${className}`}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={`${error ? errorId : ''} ${
                        helper ? helperId : ''
                    }`}
                    required={required}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    {...props}
                >
                    {emptyOption && <option value="">{emptyOption}</option>}

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

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
