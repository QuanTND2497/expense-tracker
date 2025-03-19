'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function CategoryLoading() {
    const { t } = useTranslation(['common']);

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

    const dotVariants = {
        animate: (i: number) => ({
            y: [0, -10, 0],
            opacity: [0.4, 1, 0.4],
            transition: {
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
                ease: 'easeInOut'
            }
        })
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-16">
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
                        className="w-20 h-20 border-4 border-primary/30 rounded-full border-t-primary"
                    />
                    <motion.div
                        variants={pulseVariants}
                        animate="animate"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full opacity-70"
                    />
                </motion.div>
                
                <div className="flex gap-2 mt-6">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={dotVariants}
                            animate="animate"
                            className="w-3 h-3 rounded-full bg-primary"
                        />
                    ))}
                </div>
                
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mt-6 text-base-content/80 text-lg font-medium"
                >
                    {t('loading')}
                </motion.p>
            </div>
            
            <div className="w-full max-w-md mt-12">
                <div className="h-8 w-48 bg-base-300 rounded-md animate-pulse mx-auto mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-base-300 h-24 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
