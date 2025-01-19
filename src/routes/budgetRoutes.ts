import express, { Router } from 'express';
import BudgetController from '../controllers/budgetController';


const router: Router = express.Router();

// Create a new budget
router.post('/create/:user_id',   async (req, res, next) => {
  try {
    await BudgetController.createBudget(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get the active budget for a user
router.get('/active/:user_id',   async (req, res, next) => {
  try {
    await BudgetController.getActiveBudget(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update the status of a budget
router.put('/status/:id',   async (req, res, next) => {
  try {
    await BudgetController.updateBudgetStatus(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;