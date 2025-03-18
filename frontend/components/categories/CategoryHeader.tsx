'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface CategoryHeaderProps {
    onAddNew: () => void;
}

export default function CategoryHeader({ onAddNew }: CategoryHeaderProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center mb-8"
        >
            <h1 className="text-3xl font-bold text-primary">{t('title')}</h1>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAddNew}
                className="btn btn-primary"
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                {t('addNew')}
            </motion.button>
        </motion.div>
    );
}
