import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Get all transactions for the authenticated user
export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.['id'];
        const transactions = await prisma.transaction.findMany({
            where: {
                userId
            },
            include: {
                category: true
            },
            orderBy: {
                date: 'desc'
            }
        });

        res.status(200).json({ data: transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.['id'];

        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            },
            include: {
                category: true
            }
        });

        if (!transaction) {
            res.status(404).json({ message: 'Transaction not found' });
            return;
        }

        // Check if the transaction belongs to the authenticated user
        if (transaction.userId !== userId) {
            res.status(403).json({
                message: 'Unauthorized access to this transaction'
            });
            return;
        }

        res.status(200).json({ data: transaction });
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new transaction
export const createTransaction = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const {
            amount,
            currency,
            categoryId,
            date,
            description,
            type = 'expense'
        } = req.body;
        const userId = req.user?.['id'];

        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const transaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                currency,
                categoryId,
                date: new Date(date),
                description,
                userId,
                type
            },
            include: {
                category: true
            }
        });

        res.status(201).json({ data: transaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Error creating transaction' });
    }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const { id } = req.params;
        const { amount, currency, categoryId, date, description, type } =
            req.body;
        const userId = req.user?.['id'];

        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // Verify the transaction belongs to the user
        const existingTransaction = await prisma.transaction.findUnique({
            where: { id }
        });

        if (!existingTransaction) {
            res.status(404).json({ message: 'Transaction not found' });
            return;
        }

        if (existingTransaction.userId !== userId) {
            res.status(403).json({
                message: 'Not authorized to update this transaction'
            });
            return;
        }

        const updateData: any = {};

        if (amount !== undefined) updateData.amount = parseFloat(amount);
        if (currency !== undefined) updateData.currency = currency;
        if (categoryId !== undefined) updateData.categoryId = categoryId;
        if (date !== undefined) updateData.date = new Date(date);
        if (description !== undefined) updateData.description = description;
        if (type !== undefined) updateData.type = type;

        const transaction = await prisma.transaction.update({
            where: { id },
            data: updateData,
            include: {
                category: true
            }
        });

        res.status(200).json({ data: transaction });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: 'Error updating transaction' });
    }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.['id'];

        // Check if transaction exists and belongs to the user
        const existingTransaction = await prisma.transaction.findUnique({
            where: { id }
        });

        if (!existingTransaction) {
            res.status(404).json({ message: 'Transaction not found' });
            return;
        }

        if (existingTransaction.userId !== userId) {
            res.status(403).json({
                message: 'Unauthorized access to this transaction'
            });
            return;
        }

        // Delete transaction
        await prisma.transaction.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get transactions by date range
export const getTransactionsByDateRange = async (
    req: Request,
    res: Response
) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.user?.['id'];

        if (!startDate || !endDate) {
            res.status(400).json({
                message: 'Start date and end date are required'
            });
            return;
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(startDate as string),
                    lte: new Date(endDate as string)
                }
            },
            include: {
                category: true
            },
            orderBy: {
                date: 'desc'
            }
        });

        res.status(200).json({ data: transactions });
    } catch (error) {
        console.error('Error fetching transactions by date range:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get transactions by category
export const getTransactionsByCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const { categoryId } = req.params;
        const userId = req.user?.['id'];

        // Check if the category exists
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                categoryId
            },
            include: {
                category: true
            },
            orderBy: {
                date: 'desc'
            }
        });

        res.status(200).json({ data: transactions });
    } catch (error) {
        console.error('Error fetching transactions by category:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get transaction statistics
export const getTransactionStats = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.['id'];
        const { period } = req.query; // 'day', 'week', 'month', 'year'

        let startDate = new Date();
        const endDate = new Date();

        // Calculate start date based on period
        switch (period) {
            case 'day':
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'week':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            default:
                startDate.setMonth(startDate.getMonth() - 1); // Default to month
        }

        // Get transactions for the period
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                category: true
            }
        });

        // Calculate total amount
        const total = transactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Group by category
        const categoryTotals = transactions.reduce((acc, transaction) => {
            const categoryId = transaction.categoryId;
            const categoryName = transaction.category.name;

            if (!acc[categoryId]) {
                acc[categoryId] = {
                    id: categoryId,
                    name: categoryName,
                    total: 0
                };
            }

            acc[categoryId].total += transaction.amount;
            return acc;
        }, {});

        // Convert to array and calculate percentages
        const categorySummary = Object.values(categoryTotals).map(
            (category: any) => ({
                ...category,
                percentage: total > 0 ? (category.total / total) * 100 : 0
            })
        );

        res.status(200).json({
            data: {
                period,
                total,
                categorySummary,
                transactionCount: transactions.length
            }
        });
    } catch (error) {
        console.error('Error fetching transaction statistics:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
