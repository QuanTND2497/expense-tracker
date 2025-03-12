import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const passportLocal = passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, next) => {
            if (!email || !password || !email.includes('@')) {
                return next(null, false, {
                    message: 'Email and password are required'
                });
            }
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return next(null, false, { message: 'User not found' });
            }

            if (!bcrypt.compareSync(password, user.password || '')) {
                return next(null, false, { message: 'Password is incorrect' });
            }

            return next(null, user);
        }
    )
);

export default passportLocal;
