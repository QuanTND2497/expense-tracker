import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/category';
import transactionRoutes from './routes/transaction';
import { PrismaClient } from '@prisma/client';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './passport';
import cors from 'cors';
import path from 'path';
import { exec } from 'child_process';

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
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);

// Function to run the seed script
const runSeedScript = () => {
    console.log('Running seed script to create default categories...');
    const seedPath = path.join(__dirname, '../prisma/seed.ts');
    
    exec(`npx ts-node ${seedPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running seed script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Seed script stderr: ${stderr}`);
            return;
        }
        console.log(`Seed script output: ${stdout}`);
    });
};

prisma
    .$connect()
    .then(() => {
        // Run the seed script to ensure default categories exist
        // Only run in production mode or if not started with the dev script
        if (process.env.NODE_ENV === 'production') {
            runSeedScript();
        }
        
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
