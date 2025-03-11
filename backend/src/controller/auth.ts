import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import ms from 'ms';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as ms.StringValue;

    if (!JWT_SECRET || !JWT_EXPIRES_IN) {
        res.status(500).json({
            message: 'JWT_SECRET or JWT_EXPIRES_IN is not set'
        });
        return;
    }

    const accessToken = jwt.sign(
        { user: { sub: user!.id, email: user!.email } },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN
        }
    );
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
    const JWT_REFRESH_EXPIRES_IN = process.env
        .JWT_REFRESH_EXPIRES_IN as ms.StringValue;

    if (!JWT_REFRESH_SECRET || !JWT_REFRESH_EXPIRES_IN) {
        res.status(500).json({
            message: 'JWT_REFRESH_SECRET or JWT_REFRESH_EXPIRES_IN is not set'
        });
        return;
    }
    const refreshToken = jwt.sign(
        { user: { sub: user!.id, email: user!.email } },
        JWT_REFRESH_SECRET,
        {
            expiresIn: JWT_REFRESH_EXPIRES_IN
        }
    );

    await prisma.user.update({
        where: { id: user!.id },
        data: { refreshToken, accessToken }
    });

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ms(JWT_EXPIRES_IN)
    });

    res.status(200).json({
        message: 'Logged in successfully',
        user,
        accessToken
    });
};

export const logout = async (req: Request, res: Response) => {
    const { id } = req.user as User;

    await prisma.user.update({
        where: { id },
        data: { accessToken: null, refreshToken: null }
    });
    res.clearCookie('refresh_token');
    res.status(200).json({ message: 'Logged out successfully' });
};

export const refreshToken = async (req: Request, res: Response) => {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
        res.status(401).json({ message: 'Refresh token not found' });
        return;
    }

    try {
        // Verify refresh token
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
        const decoded = jwt.verify(refresh_token, JWT_REFRESH_SECRET) as any;
        // Check if user exists and has this refresh token
        const user = await prisma.user.findUnique({
            where: { id: decoded.sub }
        });

        if (!user || user.refreshToken !== refresh_token) {
            res.status(401).json({ message: 'Invalid refresh token' });
            return;
        }

        // Generate new access token
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as ms.StringValue;

        const accessToken = jwt.sign(
            { user: { sub: user.id, email: user.email } },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Update user with new access token
        await prisma.user.update({
            where: { id: user.id },
            data: { accessToken }
        });

        res.status(200).json({
            message: 'Token refreshed successfully',
            accessToken
        });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Refresh token expired' });
            return;
        }
        res.status(401).json({ message: 'Invalid refresh token', error });
        return;
    }
};
