import express from 'express';
import { createCar, getCars, getUserCars, getCarsNotListedByUser, updateCar, deleteCar } from '../controllers/carController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Create a new car
router.post('/', auth, createCar);

// Get all cars
router.get('/', getCars);

// Get cars not listed by the user
router.get('/buy', auth, getCarsNotListedByUser);

// Get cars listed by the user
router.get('/sell', auth, getUserCars);

// Update a car
router.put('/:id', auth, updateCar);

// Delete a car
router.delete('/:id', auth, deleteCar);

export default router;
