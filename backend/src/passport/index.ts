import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import './local/local.stragegy';
import './jwt/jwt.strategy';
import './google/google.strategy';
import './facebook/facebook.strategy';

const prisma = new PrismaClient();

// Serialize user to the session
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
