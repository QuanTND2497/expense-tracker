import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({ categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                Transaction: true
            }
        });

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        res.status(200).json({ category });
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const { name, description } = req.body;

        const category = await prisma.category.create({
            data: {
                name,
                description
                // isDefault will default to false as defined in the schema
            }
        });

        res.status(201).json({
            message: 'Category created successfully',
            category
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const { id } = req.params;
        const { name, description } = req.body;

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
            where: { id }
        });

        if (!existingCategory) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        // Check if this is a default category (using any to bypass TypeScript checking)
        const isDefault = (existingCategory as any).isDefault;
        if (isDefault) {
            res.status(403).json({
                message: 'Default categories cannot be modified',
                category: existingCategory
            });
            return;
        }

        // Update category
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name,
                description,
                updatedAt: new Date()
            }
        });

        res.status(200).json({
            message: 'Category updated successfully',
            category: updatedCategory
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
            where: { id },
            include: {
                Transaction: true
            }
        });

        if (!existingCategory) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        // Check if this is a default category (using any to bypass TypeScript checking)
        const isDefault = (existingCategory as any).isDefault;
        if (isDefault) {
            res.status(403).json({
                message: 'Default categories cannot be deleted',
                category: existingCategory
            });
            return;
        }

        // Check if category has transactions
        if (existingCategory.Transaction.length > 0) {
            res.status(400).json({
                message: 'Cannot delete category with associated transactions',
                transactionCount: existingCategory.Transaction.length
            });
            return;
        }

        // Delete category
        await prisma.category.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
