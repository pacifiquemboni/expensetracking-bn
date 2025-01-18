import express, { Router } from 'express';
import BudgetController from '../controllers/budgetController';

const router: Router = express.Router();

// create a new Transaction
router.post('/create/:user_id', async (req, res, next) => {
  try {
    await BudgetController.createBudget(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;