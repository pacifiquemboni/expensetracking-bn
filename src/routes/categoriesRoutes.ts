import express, { Router } from 'express';
import CategoryController from '../controllers/categoryController';

const router: Router = express.Router();

// Register a new category
router.post('/register/:userId', async (req, res, next) => {
  try {
    await CategoryController.registerCategory(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Register a new subcategory
router.post('/subcategory', async (req, res, next) => {
  try {
    await CategoryController.registerSubCategory(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get all categories
router.get('/:userId', async (req, res, next) => {
  try {
    await CategoryController.getAllCategories(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get all subcategories for a category
router.get('/:categoryId/subcategories', async (req, res, next) => {
  try {
    await CategoryController.getAllSubCategories(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update a category
router.put('/:id', async (req, res, next) => {
  try {
    await CategoryController.updateCategory(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update a subcategory
router.put('/sub/:id', async (req, res, next) => {
  try {
    await CategoryController.updateSubCategory(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Delete a category
router.delete('/:id', async (req, res, next) => {
  try {
    await CategoryController.deleteCategory(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Delete a subcategory
router.delete('/sub/:id', async (req, res, next) => {
  try {
    await CategoryController.deleteSubCategory(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;