'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Transaction, Category } from '@/constant/interfaces';
import { fetchAPI } from '@/utils/api';
import { CATEGORY_API } from '@/constant/const';
import { AxiosResponse } from 'axios';
import {
    CalendarIcon,
    CurrencyDollarIcon,
    TagIcon,
    DocumentTextIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface TransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: {
        amount: string;
        description: string;
        date: string;
        categoryId: string;
        currency: string;
        type: 'income' | 'expense';
    }) => Promise<void>;
    editingTransaction: Transaction | null;
    initialData?: {
        amount: number;
        description: string;
        date: string;
        currency: string;
        type: 'income' | 'expense';
    };
}

export default function TransactionForm({
    isOpen,
    onClose,
    onSubmit,
    editingTransaction,
    initialData
}: TransactionFormProps) {
    const { t } = useTranslation(['transactions']);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        categoryId: '',
        currency: 'VND', // Mặc định là VND
        type: 'expense' as 'income' | 'expense' // Mặc định là chi tiêu
    });
    const [displayAmount, setDisplayAmount] = useState('');
    const [errors, setErrors] = useState({
        amount: '',
        date: '',
        categoryId: ''
    });

    // Lấy danh sách danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoadingCategories(true);
                const response = await fetchAPI<AxiosResponse<Category[]>>(
                    CATEGORY_API
                );
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoadingCategories(false);
            }
        };

        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    // Cập nhật form data khi có giao dịch cần chỉnh sửa hoặc dữ liệu ban đầu
    useEffect(() => {
        if (editingTransaction) {
            const amount = editingTransaction.amount || '';
            setFormData({
                amount: amount.toString(),
                description: editingTransaction.description || '',
                date: editingTransaction.date
                    ? new Date(editingTransaction.date)
                          .toISOString()
                          .split('T')[0]
                    : new Date().toISOString().split('T')[0],
                categoryId: (editingTransaction.categoryId || '') as string,
                currency: editingTransaction.currency || 'VND',
                type: editingTransaction.type || 'expense'
            });

            // Cập nhật giá trị hiển thị với định dạng số
            setDisplayAmount(formatNumberInput(amount.toString()));
        } else if (initialData) {
            // Sử dụng dữ liệu từ hóa đơn đã quét
            setFormData({
                amount: initialData.amount.toString(),
                description: initialData.description || '',
                date:
                    initialData.date || new Date().toISOString().split('T')[0],
                categoryId: '', // Người dùng sẽ chọn danh mục
                currency: initialData.currency || 'VND',
                type: initialData.type || 'expense'
            });

            // Cập nhật giá trị hiển thị với định dạng số
            setDisplayAmount(formatNumberInput(initialData.amount.toString()));
        } else {
            setFormData({
                amount: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                categoryId: '',
                currency: 'VND',
                type: 'expense'
            });
            setDisplayAmount('');
        }
    }, [editingTransaction, initialData]);

    // Hàm định dạng số với dấu phân cách hàng nghìn
    const formatNumberInput = (value: string): string => {
        if (!value) return '';

        // Loại bỏ tất cả ký tự không phải số và dấu chấm
        const numericValue = value.replace(/[^\d.-]/g, '');

        // Nếu là chuỗi rỗng hoặc chỉ có dấu chấm, trả về nguyên giá trị
        if (!numericValue || numericValue === '.') return numericValue;

        // Tách phần nguyên và phần thập phân
        const parts = numericValue.split('.');

        // Định dạng phần nguyên với dấu phân cách hàng nghìn
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Nếu có phần thập phân, ghép lại với phần nguyên
        if (parts.length > 1) {
            return `${integerPart}.${parts[1]}`;
        }

        return integerPart;
    };

    // Xử lý khi người dùng nhập số tiền
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Loại bỏ tất cả ký tự không phải số và dấu chấm
        const numericValue = value.replace(/[^\d.-]/g, '');

        // Cập nhật giá trị thực cho form data
        setFormData({
            ...formData,
            amount: numericValue
        });

        // Cập nhật giá trị hiển thị với định dạng
        setDisplayAmount(formatNumberInput(numericValue));
    };

    const validateForm = (): boolean => {
        const newErrors = {
            amount: '',
            date: '',
            categoryId: ''
        };
        let isValid = true;

        if (!formData.amount || isNaN(Number(formData.amount))) {
            newErrors.amount = t('transactions:invalid_amount');
            isValid = false;
        }

        if (!formData.date) {
            newErrors.date = t('transactions:invalid_date');
            isValid = false;
        }

        if (!formData.categoryId) {
            newErrors.categoryId = t('transactions:invalid_category');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await onSubmit(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="fixed inset-0 bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="modal-box bg-base-200 p-6 rounded-xl shadow-2xl relative z-10 max-w-md w-full border border-base-300"
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle absolute right-3 top-3 text-base-content/60 hover:text-base-content"
                    >
                        ✕
                    </button>
                    <h3 className="font-bold text-xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {editingTransaction
                            ? t('transactions:edit_transaction')
                            : t('transactions:add_transaction')}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Loại giao dịch */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">
                                    {t('transactions:transaction_type')}
                                </span>
                            </label>
                            <div className="flex gap-2">
                                <label className="flex-1">
                                    <input
                                        type="radio"
                                        name="type"
                                        className="hidden peer"
                                        checked={formData.type === 'income'}
                                        onChange={() =>
                                            setFormData({
                                                ...formData,
                                                type: 'income'
                                            })
                                        }
                                    />
                                    <div className="flex items-center justify-center gap-2 p-3 border border-base-300 rounded-lg cursor-pointer peer-checked:border-success peer-checked:bg-success/10 hover:bg-base-300/30 transition-all">
                                        <ArrowTrendingUpIcon className="h-5 w-5 text-success" />
                                        <span className="font-medium">
                                            {t('transactions:income')}
                                        </span>
                                    </div>
                                </label>
                                <label className="flex-1">
                                    <input
                                        type="radio"
                                        name="type"
                                        className="hidden peer"
                                        checked={formData.type === 'expense'}
                                        onChange={() =>
                                            setFormData({
                                                ...formData,
                                                type: 'expense'
                                            })
                                        }
                                    />
                                    <div className="flex items-center justify-center gap-2 p-3 border border-base-300 rounded-lg cursor-pointer peer-checked:border-error peer-checked:bg-error/10 hover:bg-base-300/30 transition-all">
                                        <ArrowTrendingDownIcon className="h-5 w-5 text-error" />
                                        <span className="font-medium">
                                            {t('transactions:expense')}
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Số tiền */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium flex items-center">
                                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                                    {t('transactions:amount')}
                                    <span className="text-error ml-1">*</span>
                                </span>
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    className={`input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                                        errors.amount ? 'input-error' : ''
                                    }`}
                                    value={displayAmount}
                                    onChange={handleAmountChange}
                                    required
                                    placeholder="0"
                                    inputMode="decimal"
                                />
                                <select
                                    className="select select-bordered ml-2 w-24"
                                    value={formData.currency}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            currency: e.target.value
                                        })
                                    }
                                >
                                    <option value="VND">VND</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                            {errors.amount && (
                                <div className="text-error text-sm mt-1">
                                    {errors.amount}
                                </div>
                            )}
                        </div>

                        {/* Mô tả */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium flex items-center">
                                    <DocumentTextIcon className="h-4 w-4 mr-1" />
                                    {t('transactions:description')}
                                </span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full h-20 resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value
                                    })
                                }
                                placeholder={t('transactions:description')}
                            />
                        </div>

                        {/* Ngày */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    {t('transactions:date')}
                                    <span className="text-error ml-1">*</span>
                                </span>
                            </label>
                            <input
                                type="date"
                                className={`input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                                    errors.date ? 'input-error' : ''
                                }`}
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        date: e.target.value
                                    })
                                }
                                required
                            />
                            {errors.date && (
                                <div className="text-error text-sm mt-1">
                                    {errors.date}
                                </div>
                            )}
                        </div>

                        {/* Danh mục */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium flex items-center">
                                    <TagIcon className="h-4 w-4 mr-1" />
                                    {t('transactions:category')}
                                    <span className="text-error ml-1">*</span>
                                </span>
                            </label>
                            <select
                                className={`select select-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                                    errors.categoryId ? 'select-error' : ''
                                }`}
                                value={formData.categoryId}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        categoryId: e.target.value
                                    })
                                }
                                required
                                disabled={isLoadingCategories}
                            >
                                <option value="">
                                    {isLoadingCategories
                                        ? t('common:loading')
                                        : t('transactions:select_category')}
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <div className="text-error text-sm mt-1">
                                    {errors.categoryId}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                className="btn btn-ghost"
                                onClick={onClose}
                            >
                                {t('common:cancel')}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="btn btn-primary"
                            >
                                {editingTransaction
                                    ? t('common:update')
                                    : t('common:create')}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
