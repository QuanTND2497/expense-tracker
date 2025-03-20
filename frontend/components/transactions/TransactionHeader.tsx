'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    PlusIcon,
    FunnelIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

interface TransactionHeaderProps {
    onAddNew: () => void;
    onRefresh: () => void;
    onFilter?: () => void;
    isFiltering?: boolean;
}

export default function TransactionHeader({
    onAddNew,
    onRefresh,
    onFilter,
    isFiltering = false
}: TransactionHeaderProps) {
    const { t } = useTranslation(['transactions', 'common']);

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {t('transactions:transactions_list')}
                </h1>
                <p className="text-base-content/70 mt-1">
                    {t('transactions:transactions')}
                </p>
            </div>
            <div className="flex gap-2">
                {onFilter && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onFilter}
                        className={`btn btn-sm ${
                            isFiltering ? 'btn-accent' : 'btn-outline btn-ghost'
                        }`}
                    >
                        <FunnelIcon className="h-4 w-4 mr-1" />
                        {t('transactions:filter_transactions')}
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRefresh}
                    className="btn btn-sm btn-outline btn-ghost"
                >
                    <ArrowPathIcon className="h-4 w-4 mr-1" />
                    {t('common:refresh')}
                </motion.button>

                <motion.button
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-content)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAddNew}
                    className="btn btn-sm btn-primary"
                >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    {t('transactions:add_transaction')}
                </motion.button>
            </div>
        </div>
    );
}
