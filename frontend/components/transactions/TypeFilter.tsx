'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    Squares2X2Icon
} from '@heroicons/react/24/outline';

type TransactionType = 'all' | 'income' | 'expense';

interface TypeFilterProps {
    onFilterChange: (type: TransactionType) => void;
    currentFilter: TransactionType;
}

export default function TypeFilter({
    onFilterChange,
    currentFilter
}: TypeFilterProps) {
    const { t } = useTranslation(['transactions']);

    const filters = [
        {
            id: 'all',
            label: t('transactions:all'),
            icon: Squares2X2Icon,
            color: 'primary'
        },
        {
            id: 'income',
            label: t('transactions:income'),
            icon: ArrowTrendingUpIcon,
            color: 'success'
        },
        {
            id: 'expense',
            label: t('transactions:expense'),
            icon: ArrowTrendingDownIcon,
            color: 'error'
        }
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <span className="self-center text-sm font-medium text-base-content/70 mr-2">
                {t('transactions:filter_by_type')}:
            </span>
            <div className="flex bg-base-200 rounded-lg p-1">
                {filters.map((filter) => {
                    const isActive = currentFilter === filter.id;
                    const Icon = filter.icon;
                    const colorClass = `text-${filter.color}`;
                    const bgClass = isActive ? `bg-${filter.color}/10` : '';

                    return (
                        <motion.button
                            key={filter.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                                onFilterChange(filter.id as TransactionType)
                            }
                            className={`flex items-center px-3 py-1.5 rounded-md ${
                                isActive
                                    ? `${bgClass} font-medium`
                                    : 'hover:bg-base-300/50'
                            }`}
                        >
                            <Icon
                                className={`h-4 w-4 mr-1.5 ${
                                    isActive
                                        ? colorClass
                                        : 'text-base-content/70'
                                }`}
                            />
                            <span className={isActive ? colorClass : ''}>
                                {filter.label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
