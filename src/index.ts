import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './router/auth';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', authRouter);

const main = async () => {
    const mongooseKey = String(process.env.MONGOOSEURL);
    await mongoose.connect(mongooseKey);
    app.listen(process.env.PORT);
};

main();
