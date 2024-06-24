import express from 'express';
const router = express.Router();
import { register, login, getUser } from '../controllers/authController.js';
import auth from '../middlewares/auth.js';

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Get user data
router.get('/', auth, getUser);

export default router;
