'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { fetchAPI } from '@/utils/api';
import { CATEGORY_API } from '@/constant/const';
import { Category } from '@/constant/interfaces';
import { AxiosResponse } from 'axios';

// Import components
import CategoryHeader from '@/components/categories/CategoryHeader';
import CategoryList from '@/components/categories/CategoryList';
import CategoryForm from '@/components/categories/CategoryForm';
import CategoryLoading from '@/components/categories/CategoryLoading';

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );

    const fetchCategories = async () => {
        try {
            const categoriesResponse = await fetchAPI<
                AxiosResponse<Category[]>
            >(CATEGORY_API);
            const categories = categoriesResponse.data;
            setCategories(categories);
        } catch (error: unknown) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (formData: {
        name: string;
        description: string;
    }) => {
        try {
            const url = editingCategory
                ? `${CATEGORY_API}/${editingCategory.id}`
                : CATEGORY_API;
            const method = editingCategory ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to save category');

            toast.success(
                editingCategory
                    ? 'Category updated successfully'
                    : 'Category created successfully'
            );
            setIsModalOpen(false);
            setEditingCategory(null);
            fetchCategories();
        } catch (error: unknown) {
            console.error('Error saving category:', error);
            toast.error('Failed to save category');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${CATEGORY_API}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete category');

            toast.success('Category deleted successfully');
            fetchCategories();
        } catch (error: unknown) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category');
        }
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            {isLoading ? (
                <CategoryLoading />
            ) : (
                <>
                    <CategoryHeader onAddNew={handleAddNew} />

                    <CategoryList
                        categories={categories}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />

                    <CategoryForm
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleSubmit}
                        editingCategory={editingCategory}
                    />
                </>
            )}
        </>
    );
}
