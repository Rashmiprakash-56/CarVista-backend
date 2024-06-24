import express from 'express';
import connectdb from './config/db.js';
import authRoutes from './Routes/auth.js';
import carRoutes from './Routes/car.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
connectdb();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
