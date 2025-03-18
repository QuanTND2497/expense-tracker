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
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

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
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="card-body">
                                <h2 className="card-title text-primary">
                                    {category.name}
                                </h2>
                                {category.description && (
                                    <p className="text-base-content/70">
                                        {category.description}
                                    </p>
                                )}
                                <div className="card-actions justify-end mt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => onEdit(category)}
                                        className="btn btn-sm btn-ghost hover:bg-primary/20"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleDeleteClick(category.id)}
                                        className="btn btn-sm btn-ghost text-error hover:bg-error/20"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Delete Confirmation Modal */}
            {categoryToDelete && (
                <div className="modal modal-open">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="modal-box"
                    >
                        <h3 className="font-bold text-lg">{t('categories:deleteConfirm')}</h3>
                        <div className="modal-action">
                            <button onClick={cancelDelete} className="btn">
                                {t('common:cancel')}
                            </button>
                            <button onClick={confirmDelete} className="btn btn-error">
                                {t('common:delete')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
