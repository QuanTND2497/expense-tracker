import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import { PrismaClient } from '@prisma/client';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(bodyParser.json());
app.use(flash());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', authRoutes);

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
