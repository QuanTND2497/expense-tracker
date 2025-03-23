'use client';

import { useEffect, useState, useMemo } from 'react';
import { fetchAPI } from '@/utils/api';
import { TRANSACTION_API } from '@/constant/const';
import { Transaction } from '@/constant/interfaces';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { showErrorToast, showSuccessToast } from '@/utils/toast';

// Import components
import TransactionHeader from '@/components/transactions/TransactionHeader';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionForm from '@/components/transactions/TransactionForm';
import TransactionLoading from '@/components/transactions/TransactionLoading';
import TypeFilter from '@/components/transactions/TypeFilter';

// Transaction type
type TransactionType = 'all' | 'income' | 'expense';

export default function Transactions() {
    const { t } = useTranslation(['transactions', 'common']);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [typeFilter, setTypeFilter] = useState<TransactionType>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);

    // Lọc giao dịch theo loại
    const filteredTransactions = useMemo(() => {
        if (typeFilter === 'all') {
            return transactions;
        }
        return transactions.filter(
            (transaction) => transaction.type === typeFilter
        );
    }, [transactions, typeFilter]);

    const fetchTransactions = async () => {
        try {
            setIsLoading(true);
            const transactionsResponse = await fetchAPI<
                AxiosResponse<Transaction[]>
            >(TRANSACTION_API);
            setTransactions(transactionsResponse.data);
        } catch (error: unknown) {
            console.error('Lỗi khi lấy danh sách giao dịch:', error);
            showErrorToast(t('transactions:error_fetching'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data: {
        amount: string;
        currency: string;
        categoryId: string;
        date: string;
        description: string;
        type: 'income' | 'expense';
    }) => {
        setIsLoading(true);
        try {
            const url = editingTransaction
                ? `${TRANSACTION_API}/${editingTransaction._id}`
                : TRANSACTION_API;
            const method = editingTransaction ? 'PUT' : 'POST';

            const response = await fetchAPI<AxiosResponse<Transaction>>(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.data) {
                showSuccessToast(
                    editingTransaction
                        ? t('transactions:transaction_updated')
                        : t('transactions:transaction_created')
                );
                setIsModalOpen(false);
                setEditingTransaction(null);
                fetchTransactions();
            } else {
                showErrorToast(t('transactions:error_saving'));
            }
        } catch (error: unknown) {
            console.error('Lỗi khi lưu giao dịch:', error);
            showErrorToast(t('transactions:error_saving'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetchAPI(`${TRANSACTION_API}/${id}`, {
                method: 'DELETE'
            });

            showSuccessToast(t('transactions:transaction_deleted'));
            fetchTransactions();
        } catch (error: unknown) {
            console.error('Lỗi khi xóa giao dịch:', error);
            showErrorToast(t('transactions:error_deleting'));
        }
    };

    const openEditModal = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingTransaction(null);
        setIsModalOpen(true);
    };

    const handleRefresh = () => {
        fetchTransactions();
    };

    const handleTypeFilterChange = (type: TransactionType) => {
        setTypeFilter(type);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <>
            {isLoading ? (
                <TransactionLoading />
            ) : (
                <>
                    <TransactionHeader
                        onAddNew={handleAddNew}
                        onRefresh={handleRefresh}
                    />

                    <TypeFilter
                        onFilterChange={handleTypeFilterChange}
                        currentFilter={typeFilter}
                    />

                    <TransactionList
                        transactions={filteredTransactions}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />

                    <TransactionForm
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleSubmit}
                        editingTransaction={editingTransaction}
                    />
                </>
            )}
        </>
    );
}
