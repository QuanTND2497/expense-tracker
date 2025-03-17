import express from 'express';
import {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByDateRange,
    getTransactionsByCategory,
    getTransactionStats
} from '../controller/transaction';
import { body, query } from 'express-validator';
import { authenticate } from '../constant/function';

const router = express.Router();

// Get all transactions for the authenticated user
router.get('/', authenticate, getAllTransactions);

// Get transaction statistics
router.get(
    '/stats',
    authenticate,
    [
        query('period')
            .optional()
            .isIn(['day', 'week', 'month', 'year'])
            .withMessage('Period must be one of: day, week, month, year')
    ],
    getTransactionStats
);

// Get transactions by date range
router.get(
    '/date-range',
    authenticate,
    [
        query('startDate')
            .notEmpty()
            .withMessage('Start date is required')
            .isISO8601()
            .withMessage('Start date must be in ISO format (YYYY-MM-DD)'),
        query('endDate')
            .notEmpty()
            .withMessage('End date is required')
            .isISO8601()
            .withMessage('End date must be in ISO format (YYYY-MM-DD)')
    ],
    getTransactionsByDateRange
);

// Get transactions by category
router.get('/category/:categoryId', authenticate, getTransactionsByCategory);

// Get transaction by ID
router.get('/:id', authenticate, getTransactionById);

// Create a new transaction
router.post(
    '/',
    authenticate,
    [
        body('amount')
            .notEmpty()
            .withMessage('Amount is required')
            .isNumeric()
            .withMessage('Amount must be a number'),
        body('currency')
            .notEmpty()
            .withMessage('Currency is required')
            .isLength({ min: 3, max: 3 })
            .withMessage('Currency must be a 3-letter code (e.g., USD, EUR)'),
        body('categoryId').notEmpty().withMessage('Category ID is required'),
        body('date')
            .notEmpty()
            .withMessage('Date is required')
            .isISO8601()
            .withMessage('Date must be in ISO format (YYYY-MM-DD)'),
        body('description')
            .optional()
            .isString()
            .withMessage('Description must be a string')
    ],
    createTransaction
);

// Update a transaction
router.put(
    '/:id',
    authenticate,
    [
        body('amount')
            .optional()
            .isNumeric()
            .withMessage('Amount must be a number'),
        body('currency')
            .optional()
            .isLength({ min: 3, max: 3 })
            .withMessage('Currency must be a 3-letter code (e.g., USD, EUR)'),
        body('categoryId').optional(),
        body('date')
            .optional()
            .isISO8601()
            .withMessage('Date must be in ISO format (YYYY-MM-DD)'),
        body('description')
            .optional()
            .isString()
            .withMessage('Description must be a string')
    ],
    updateTransaction
);

// Delete a transaction
router.delete('/:id', authenticate, deleteTransaction);

export default router;
