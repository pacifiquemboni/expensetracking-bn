import express, { Router } from 'express';
import UserController from '../controllers/userController';

const router: Router = express.Router();

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
	await UserController.registerUser(req, res, next);
  } catch (error) {
	next(error);
  }
});

// Get a single user by ID
router.get('/:id', async (req, res, next) => {
  try {
    await UserController.getSingleUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get('/', async (req, res, next) => {
  try {
    await UserController.getAllUsers(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update a user by ID
router.put('/:id', async (req, res, next) => {
  try {
    await UserController.updateUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res, next) => {
  try {
    await UserController.deleteUser(req, res, next);
  } catch (error) {
    next(error);
  }
});
// login a user 
router.post('/login', async (req, res, next) => {
  try {
    await UserController.loginUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;