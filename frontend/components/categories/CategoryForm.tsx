'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
        <div className="modal modal-open">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="modal-box"
            >
                <h3 className="font-bold text-lg mb-4">
                    {editingCategory
                        ? t('categories:editTitle')
                        : t('categories:createTitle')}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{t('categories:name')}</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{t('categories:description')}</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="modal-action">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="btn"
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
                            {editingCategory ? t('common:update') : t('common:create')}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
