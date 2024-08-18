const express = require('express');
const cors = require('cors');
const cardRoutes = require('./routes/cardRoutes');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./config/rateLimiter');

const app = express();

// Configure CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type'], 
}));

app.use(rateLimiter);

app.use(express.json());

app.get('/ping', (req, res) => res.json({ message: 'PONG!!! Server is running' }));

app.use('/cards', cardRoutes);

app.use(errorHandler);

module.exports = app;