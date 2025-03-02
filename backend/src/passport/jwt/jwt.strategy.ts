import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const jwtStrategy = passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET as string
        },
        async (jwt_payload, done) => {
            const user = await prisma.user.findUnique({
                where: { id: jwt_payload.sub }
            });

            if (!user) {
                return done(new Error('User not found'));
            }

            return done(null, user);
        }
    )
);

// Thêm middleware này sau khi xác thực JWT
export const checkTokenValidity = async (req, res, next) => {
    const { id } = req.user;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Lấy token từ header

    const user = await prisma.user.findUnique({
        where: { id }
    });

    if (!user || user.accessToken !== token) {
        return res
            .status(401)
            .json({ message: 'Token has been revoked or changed' });
    }

    next();
};

export default jwtStrategy;
