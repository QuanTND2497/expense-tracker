import express from 'express';
import { register } from '../controller/user';
import { body } from 'express-validator';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

router.post(
    '/register',
    [
        body('email')
            .notEmpty()
            .isEmail()
            .withMessage('Invalid email')
            .normalizeEmail()
            .custom((value) => {
                return prisma.user
                    .findUnique({ where: { email: value } })
                    .then((user) => {
                        if (user) {
                            return Promise.reject(
                                'Email address already exists!'
                            );
                        }
                    });
            }),
        body('password')
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage('Password must be at least 3 characters long')
            .trim(),
    ],
    register
);

export default router;
