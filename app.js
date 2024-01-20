// app.js

const express = require('express');
const app = express();
const connectDB = require('./db'); // Import MongoDB connection

const cors = require('cors'); // if needed for cross-origin requests
const examRoutes = require('./routes/examRoutes'); // Assuming exam-related routes

// Middleware
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS if required for cross-origin requests

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the MCQ Exam Application');
});

// Include exam-related routes
app.use('/', examRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
