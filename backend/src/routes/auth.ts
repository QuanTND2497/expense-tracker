import express from 'express';
import { login, logout, refreshToken } from '../controller/auth';
import passportLocal from '../passport/local/local.stragegy';
import jwtStrategy, { checkTokenValidity } from '../passport/jwt/jwt.strategy';

const router = express.Router();

router.post(
    '/login',
    passportLocal.authenticate('local', { session: false }),
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
