// app.js
import express from "express";
import dotenv from "dotenv";
import connectDB from './db/connect.js';
// router
import userRouter from "./routes/users.js";
import authRouter from './routes/auth.js';
import providerRouter from './routes/providers.js';
import productRouter from './routes/products.js';
import productTypeRouter from './routes/productType.js';
import storageRouter from './routes/storages.js';
import importRouter from './routes/imports.js';

// middleware
import { notFound } from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";

import cors from 'cors'; // npm install cors
import cookieParser from 'cookie-parser'; // npm install cookie-parser

dotenv.config({quiet: true});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Route cơ bản
app.get('/', (req, res) => {
  res.send('Hello from your Express API!');
});

// health route (để deploy trên render)
app.get('/health', (req, res) => {
  res.status(200).send('OK'); // Or res.status(200).json({ status: 'OK' });
});

// Use cookie-parser middleware before your routes if you need to parse cookies
app.use(cookieParser());

// CORS configuration for local development
// Adjust origin for production deployment!
app.use(cors({
  origin: process.env.NEXT_APP, // Your Next.js app's origin
  credentials: true, // This is essential to allow cookies to be sent and received
}));


// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/providers', providerRouter);
app.use('/api/products', productRouter);
app.use('/api/productType', productTypeRouter);
app.use('/api/storages',storageRouter);
app.use('/api/imports', importRouter);

// Basic 404 handler
app.use(notFound);

// error handler
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log('Connected to the database!');
    app.listen(port, () => {
    console.log(`Express API listening on port ${port}`);
    });
  }
  catch (e) {
    console.error(e);
  }
}
// Start the server
startServer();