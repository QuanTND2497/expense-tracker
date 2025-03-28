'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PencilIcon,
    TrashIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Transaction } from '@/constant/interfaces';
import { formatCurrency, formatDate } from '@/utils/format';

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: string) => void;
}

export default function TransactionList({
    transactions,
    onEdit,
    onDelete
}: TransactionListProps) {
    const { t, i18n } = useTranslation(['transactions', 'common']);
    const [transactionToDelete, setTransactionToDelete] = useState<
        string | null
    >(null);

    const currentLocale = i18n.language;

    const handleDeleteClick = (id: string) => {
        setTransactionToDelete(id);
    };

    const confirmDelete = () => {
        if (transactionToDelete) {
            onDelete(transactionToDelete);
            setTransactionToDelete(null);
        }
    };

    const cancelDelete = () => {
        setTransactionToDelete(null);
    };

    // Hàm để xác định màu dựa trên loại giao dịch (thu nhập hoặc chi tiêu)
    const getAmountColorClass = (type: string, amount: number | string) => {
        if (type === 'income') return 'text-success';
        if (type === 'expense') return 'text-error';

        // Fallback dựa vào số tiền nếu không có loại giao dịch
        const numAmount =
            typeof amount === 'string' ? parseFloat(amount) : amount;
        return numAmount >= 0 ? 'text-success' : 'text-error';
    };

    // Hàm để lấy icon tương ứng với loại giao dịch
    const getTransactionTypeIcon = (type: string) => {
        if (type === 'income')
            return <ArrowTrendingUpIcon className="h-4 w-4 text-success" />;
        if (type === 'expense')
            return <ArrowTrendingDownIcon className="h-4 w-4 text-error" />;

        return <CurrencyDollarIcon className="h-4 w-4 text-base-content/50" />;
    };

    if (transactions.length === 0) {
        return (
            <div className="text-center py-10">
                <CurrencyDollarIcon className="h-16 w-16 mx-auto text-base-content/30" />
                <h3 className="mt-4 text-lg font-medium">
                    {t('transactions:no_transactions')}
                </h3>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr>
                            <th>{t('transactions:date')}</th>
                            <th>{t('transactions:description')}</th>
                            <th>{t('transactions:category')}</th>
                            <th>{t('transactions:transaction_type')}</th>
                            <th className="text-right">
                                {t('transactions:amount')}
                            </th>
                            <th className="text-right">
                                {t('common:actions')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {transactions.map((transaction, index) => (
                                <motion.tr
                                    key={`${transaction._id}-${index}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-base-200"
                                >
                                    <td>
                                        <div className="flex items-center space-x-2">
                                            <CalendarIcon className="h-4 w-4 text-base-content/50" />
                                            <span>
                                                {formatDate(
                                                    transaction.date,
                                                    currentLocale
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="font-medium">
                                        {transaction.description}
                                    </td>
                                    <td>{transaction.category?.name || '-'}</td>
                                    <td>
                                        <div className="flex items-center gap-1.5">
                                            {getTransactionTypeIcon(
                                                transaction.type
                                            )}
                                            <span>
                                                {t(
                                                    `transactions:${transaction.type}`
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        className={`text-right font-semibold ${getAmountColorClass(
                                            transaction.type,
                                            transaction.amount
                                        )}`}
                                    >
                                        {formatCurrency(
                                            transaction.amount,
                                            transaction.currency,
                                            currentLocale
                                        )}
                                    </td>
                                    <td className="text-right">
                                        <div className="flex justify-end space-x-1">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() =>
                                                    onEdit(transaction)
                                                }
                                                className="btn btn-xs btn-ghost text-primary hover:bg-primary/10"
                                                aria-label={t(
                                                    'transactions:edit_transaction'
                                                )}
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        transaction._id
                                                    )
                                                }
                                                className="btn btn-xs btn-ghost text-error hover:bg-error/10"
                                                aria-label={t(
                                                    'transactions:delete_transaction'
                                                )}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Modal xác nhận xóa */}
            {transactionToDelete && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="fixed inset-0 bg-base-300/50 bg-opacity-50 backdrop-blur-sm"
                        onClick={cancelDelete}
                    ></div>
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="bg-base-200 p-6 rounded-xl shadow-2xl relative z-10 max-w-md w-full border border-base-300"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-error"></div>
                            <button
                                onClick={cancelDelete}
                                className="btn btn-sm btn-circle absolute right-3 top-3 text-base-content/60 hover:text-base-content"
                            >
                                ✕
                            </button>
                            <h3 className="font-bold text-xl mb-6 text-error">
                                {t('transactions:confirm_delete')}
                            </h3>
                            <div className="flex justify-end space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn btn-ghost"
                                    onClick={cancelDelete}
                                >
                                    {t('common:cancel')}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn btn-error"
                                    onClick={confirmDelete}
                                >
                                    {t('common:delete')}
                                </motion.button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </>
    );
}
