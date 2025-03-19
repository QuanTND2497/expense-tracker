'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import i18nConfig from '@/i18nConfig';
import LanguageLoadingOverlay from './LanguageLoadingOverlay';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageChange = (locale: string) => {
        if (locale === currentLocale) {
            setIsOpen(false);
            return;
        }

        setIsLoading(true);

        // Get the current path without the locale
        const pathnameParts = pathname.split('/');

        // Replace the locale part (index 1) with the new locale
        if (pathnameParts.length > 2) {
            pathnameParts[1] = locale;
        } else {
            // If for some reason there's no path parts, create a valid one
            pathnameParts.splice(1, 0, locale);
        }

        // Construct the new path with the new locale
        const newPath = pathnameParts.join('/');

        // Change the language in i18n
        i18n.changeLanguage(locale);

        // Navigate to the new path with a slight delay for better UX
        setTimeout(() => {
            router.push(newPath);

            // Hide loading after a bit longer to ensure the page has loaded
            setTimeout(() => {
                setIsLoading(false);
                setIsOpen(false);
            }, 500);
        }, 800);
    };

    const getLanguageText = (locale: string) => {
        switch (locale) {
            case 'en':
                return 'English';
            case 'vi':
                return 'Tiếng Việt';
            default:
                return locale;
        }
    };

    const getLanguageFlag = (locale: string) => {
        switch (locale) {
            case 'en':
                return '🇬🇧';
            case 'vi':
                return '🇻🇳';
            default:
                return '🌐';
        }
    };

    return (
        <>
            <LanguageLoadingOverlay isVisible={isLoading} />

            <div className="relative" ref={dropdownRef}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn btn-sm btn-ghost gap-2"
                    aria-label="Change language"
                >
                    <span className="text-lg">
                        {getLanguageFlag(currentLocale)}
                    </span>
                    <span className="hidden md:inline">
                        {getLanguageText(currentLocale)}
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </motion.button>

                <AnimatePresence>
                    {isOpen && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-base-300 ring-1 ring-black ring-opacity-5 z-50"
                        >
                            <div className="py-1">
                                {i18nConfig.locales.map((locale) => (
                                    <button
                                        key={locale}
                                        onClick={() =>
                                            handleLanguageChange(locale)
                                        }
                                        className={`${
                                            currentLocale === locale
                                                ? 'bg-primary/20 text-primary-content'
                                                : 'text-white'
                                        } group flex w-full items-center px-4 py-2 text-sm hover:bg-primary/10`}
                                    >
                                        <span className="mr-2 text-lg">
                                            {getLanguageFlag(locale)}
                                        </span>
                                        {getLanguageText(locale)}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
