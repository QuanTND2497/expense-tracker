import express from 'express';
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controller/category';
import { body } from 'express-validator';
import { authenticate } from '../constant/function';

const router = express.Router();

// Get all categories
router.get('/', authenticate, getAllCategories);

// Get category by ID
router.get('/:id', authenticate, getCategoryById);

// Create a new category - requires authentication
router.post(
    '/',
    authenticate,
    [
        body('name')
            .notEmpty()
            .withMessage('Category name is required')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Category name must be between 2 and 50 characters'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 200 })
            .withMessage('Description cannot exceed 200 characters')
    ],
    createCategory
);

// Update a category - requires authentication
router.put(
    '/:id',
    authenticate,
    [
        body('name')
            .notEmpty()
            .withMessage('Category name is required')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Category name must be between 2 and 50 characters'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 200 })
            .withMessage('Description cannot exceed 200 characters')
    ],
    updateCategory
);

// Delete a category - requires authentication
router.delete('/:id', authenticate, deleteCategory);

export default router;
