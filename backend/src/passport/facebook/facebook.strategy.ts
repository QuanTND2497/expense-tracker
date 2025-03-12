import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const facebookStrategy = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { facebookId: profile.id },
                        { email: profile.emails?.[0]?.value }
                    ]
                }
            });

            if (existingUser) {
                // Update the facebookId if the user registered with email but is now using Facebook
                if (!existingUser.facebookId) {
                    await prisma.user.update({
                        where: { id: existingUser.id },
                        data: { facebookId: profile.id }
                    });
                }
                return done(null, existingUser);
            }

            // Create new user
            const newUser = await prisma.user.create({
                data: {
                    email: profile.emails?.[0]?.value || '',
                    name: profile.displayName,
                    facebookId: profile.id,
                    avatar: profile.photos?.[0]?.value
                }
            });

            return done(null, newUser);
        } catch (error) {
            return done(error as Error);
        }
    }
);

passport.use(facebookStrategy);

export default passport;
