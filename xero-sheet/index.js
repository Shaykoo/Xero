import express from 'express';
import axios from 'axios';
import cors from 'cors'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const API_URL = process.env.API_URL;

// Routes
app.get('/balance-sheet', async (req, res, next) => {
  try {
    const { data } = await axios.get(API_URL);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err.message);
  const statusCode = err.response?.status || 500;
  res.status(statusCode).json({ error: err.message || 'Internal Server Error' });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
