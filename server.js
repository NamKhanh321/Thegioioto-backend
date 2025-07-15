// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routes/users');

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from your Express API!');
});

// Example API route
app.use("/api/users",userRouter);

// Basic 404 handler
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Basic error handler (must have 4 arguments)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Express API listening on port ${port}`);
});