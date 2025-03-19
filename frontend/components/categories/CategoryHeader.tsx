'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface CategoryHeaderProps {
    onAddNew: () => void;
}

export default function CategoryHeader({ onAddNew }: CategoryHeaderProps) {
    const { t } = useTranslation('categories');

    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {t('title')}
                    </h1>
                    <p className="text-base-content/70 mt-2">
                        {t('description')}
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAddNew}
                    className="btn btn-primary mt-4 sm:mt-0 gap-2 shadow-lg"
                >
                    <PlusIcon className="w-5 h-5" />
                    {t('addNew')}
                </motion.button>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full"></div>
        </div>
    );
}
