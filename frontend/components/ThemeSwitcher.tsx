'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeSwitcher() {
    const { t } = useTranslation('common');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);

    // Once mounted, we can safely use client-side only features
    useEffect(() => {
        setMounted(true);
        
        // Get the current theme from DOM
        const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null;
        
        if (currentTheme) {
            // Set state based on current theme
            setTheme(currentTheme);
        }
    }, []);

    const toggleTheme = () => {
        if (!mounted) return;
        
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Update localStorage and DOM
        try {
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Add theme transition class
            document.documentElement.classList.add('theme-transition');
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 500);
        } catch (e) {
            console.error('Error saving theme preference:', e);
        }
    };

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) return null;

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-sm btn-ghost relative overflow-hidden"
            onClick={toggleTheme}
            aria-label={t('theme_toggle')}
        >
            <motion.div
                initial={false}
                animate={{ 
                    y: theme === 'dark' ? 0 : -30,
                    opacity: theme === 'dark' ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <MoonIcon className="h-5 w-5" />
            </motion.div>
            
            <motion.div
                initial={false}
                animate={{ 
                    y: theme === 'light' ? 0 : 30,
                    opacity: theme === 'light' ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <SunIcon className="h-5 w-5" />
            </motion.div>
            
            <span className="sr-only">
                {theme === 'dark' ? t('switch_to_light') : t('switch_to_dark')}
            </span>
        </motion.button>
    );
} 