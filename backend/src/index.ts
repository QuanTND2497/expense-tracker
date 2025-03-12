import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import { PrismaClient } from '@prisma/client';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './passport';
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true
    })
);

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

prisma
    .$connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
