import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
        scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { googleId: profile.id },
                        { email: profile.emails?.[0]?.value }
                    ]
                }
            });

            if (existingUser) {
                // Update the googleId if the user registered with email but is now using Google
                if (!existingUser.googleId) {
                    await prisma.user.update({
                        where: { id: existingUser.id },
                        data: { googleId: profile.id }
                    });
                }
                return done(null, existingUser);
            }

            // Create new user
            const newUser = await prisma.user.create({
                data: {
                    email: profile.emails?.[0]?.value || '',
                    name: profile.displayName,
                    googleId: profile.id,
                    avatar: profile.photos?.[0]?.value
                }
            });

            return done(null, newUser);
        } catch (error) {
            return done(error as Error);
        }
    }
);

passport.use(googleStrategy);

export default passport;
