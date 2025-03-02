import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const passportLocal = passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            if (!email || !password || !email.includes('@')) {
                return done(new Error('Email and password are required'));
            }

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return done(new Error('User not found'));
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return done(new Error('Password is incorrect'));
            }

            return done(null, user);
        }
    )
);

export default passportLocal;
