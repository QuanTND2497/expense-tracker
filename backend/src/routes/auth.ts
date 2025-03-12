import express from 'express';
import { login, logout, refreshToken, socialLogin } from '../controller/auth';
import passportLocal from '../passport/local/local.stragegy';
import jwtStrategy, { checkTokenValidity } from '../passport/jwt/jwt.strategy';
import passport from '../passport';

const router = express.Router();

router.post(
    '/login',
    (req, res, next) => {
        passportLocal.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: info.message });
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    login
);

router.get(
    '/logout',
    jwtStrategy.authenticate('jwt', { session: false }),
    checkTokenValidity,
    logout
);

router.get('/refresh-token', refreshToken);

// Google OAuth routes
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    async (req, res) => {
        await socialLogin(req, res);
    }
);

// Facebook OAuth routes
router.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        session: false
    }),
    async (req, res) => {
        await socialLogin(req, res);
    }
);

export default router;
