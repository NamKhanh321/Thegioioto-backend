// app.js
import express from "express";
import dotenv from "dotenv";
import connectDB from './db/connect.js';
import userRouter from "./routes/users.js";
import authRouter from './routes/auth.js';

import cors from 'cors'; // npm install cors
import cookieParser from 'cookie-parser'; // npm install cookie-parser

dotenv.config({quiet: true});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from your Express API!');
});

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


// Example API route
app.use("/api/users", userRouter);
app.use('/api/auth', authRouter);

// Basic 404 handler
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Basic error handler (must have 4 arguments)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

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