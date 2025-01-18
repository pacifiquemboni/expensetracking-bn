import express, { Router } from 'express';
import TransactionController from '../controllers/transactionController';

const router: Router = express.Router();

// create a new Transaction
router.post('/create/:user_id', async (req, res, next) => {
  try {
    await TransactionController.createTransaction(req, res, next);
  } catch (error) {
    next(error);
  }
});
// // Get a single transaction by ID
// router.get('/:id', async (req, res, next) => {
//     try {
//       await TransactionController.getTransaction(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   });
  // Get all user transactions
router.get('/:user_id', async (req, res, next) => {
  try {
    await TransactionController.getUserTransactions(req, res, next);
  } catch (error) {
    next(error);
  }
});
  // Get all transactions
router.get('/', async (req, res, next) => {
    try {
      await TransactionController.getAllTransactions(req, res, next);
    } catch (error) {
      next(error);
    }
  });
  
  // Update a transaction by ID
  router.put('/:id', async (req, res, next) => {
    try {
      await TransactionController.updateTransaction(req, res, next);
    } catch (error) {
      next(error);
    }
  });
  
  // Delete a transaction by ID
  router.delete('/:id', async (req, res, next) => {
    try {
      await TransactionController.deleteTransaction(req, res, next);
    } catch (error) {
      next(error);
    }
  });
export default router;