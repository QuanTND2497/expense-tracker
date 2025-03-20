'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Category } from '@/constant/interfaces';

interface CategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: { name: string; description: string }) => Promise<void>;
    editingCategory: Category | null;
}

export default function CategoryForm({
    isOpen,
    onClose,
    onSubmit,
    editingCategory
}: CategoryFormProps) {
    const { t } = useTranslation(['categories', 'common']);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (editingCategory) {
            setFormData({
                name: editingCategory.name,
                description: editingCategory.description || ''
            });
        } else {
            setFormData({
                name: '',
                description: ''
            });
        }
    }, [editingCategory]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
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
                        {editingCategory
                            ? t('categories:editTitle')
                            : t('categories:createTitle')}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">{t('categories:name')}</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                                required
                                placeholder={t('categories:namePlaceholder') || 'Enter category name'}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">{t('categories:description')}</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full h-32 resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value
                                    })
                                }
                                placeholder={t('categories:descriptionPlaceholder') || 'Enter category description'}
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                className="btn btn-ghost"
                                onClick={onClose}
                            >
                                {t('categories:cancel')}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="btn btn-primary"
                            >
                                {editingCategory ? t('categories:edit') : t('categories:addNew')}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
