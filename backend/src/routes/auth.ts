import express from 'express';
import { login, logout, refreshToken } from '../controller/auth';
import passportLocal from '../passport/local/local.stragegy';
import jwtStrategy, { checkTokenValidity } from '../passport/jwt/jwt.strategy';

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

export default router;
