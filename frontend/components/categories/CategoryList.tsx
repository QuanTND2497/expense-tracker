'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Category } from '@/constant/interfaces';

interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
}

export default function CategoryList({
    categories,
    onEdit,
    onDelete
}: CategoryListProps) {
    const { t } = useTranslation(['categories', 'common']);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(
        null
    );

    const handleDeleteClick = (id: string) => {
        setCategoryToDelete(id);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            onDelete(categoryToDelete);
            setCategoryToDelete(null);
        }
    };

    const cancelDelete = () => {
        setCategoryToDelete(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {categories.map((category) => {
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="card bg-base-200 shadow-xl overflow-hidden"
                            >
                                <div className="h-2 bg-gradient-to-r w-full block"></div>
                                <div className="card-body">
                                    <h2 className="card-title font-bold text-lg text-base-content">
                                        {category.name}
                                        <span className="badge badge-sm badge-primary ml-2">
                                            {category.id.slice(-4)}
                                        </span>
                                    </h2>
                                    {category.description && (
                                        <p className="text-base-content/70 text-sm mt-1">
                                            {category.description}
                                        </p>
                                    )}
                                    <div className="card-actions justify-end mt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => onEdit(category)}
                                            className="btn btn-sm btn-ghost hover:bg-primary/20 text-primary"
                                            aria-label={t('categories:edit')}
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() =>
                                                handleDeleteClick(category.id)
                                            }
                                            className="btn btn-sm btn-ghost text-error hover:bg-error/20"
                                            aria-label={t('categories:delete')}
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Delete Confirmation Modal */}
            {categoryToDelete && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="fixed inset-0  bg-opacity-50 backdrop-blur-sm"
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
                                {t('categories:deleteConfirm')}
                            </h3>
                            <div className="flex justify-end gap-3 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={cancelDelete}
                                    className="btn btn-ghost"
                                >
                                    {t('categories:cancel')}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={confirmDelete}
                                    className="btn btn-error"
                                >
                                    {t('categories:delete')}
                                </motion.button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </>
    );
}
