'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function CategoryLoading() {
    const { t } = useTranslation(['default']);

    const spinnerVariants = {
        animate: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear'
            }
        }
    };

    const pulseVariants = {
        animate: {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut'
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                >
                    <motion.div
                        variants={spinnerVariants}
                        animate="animate"
                        className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent"
                    />
                    <motion.div
                        variants={pulseVariants}
                        animate="animate"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full"
                    />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mt-6 text-base-content/70 text-lg font-medium"
                >
                    {t('loading')}
                </motion.p>
            </div>
        </div>
    );
}
