import express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import userRoute from './UserRoutes';
import categoryRoute from './categoriesRoutes';
import transactionRoute from './transactionRoutes'
import budgetRoute from './budgetRoutes'
import exportRoute from './exportRoutes'
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Expense Tracking website');
});

router.use('/users', userRoute);
router.use('/category', categoryRoute);
router.use('/transaction', transactionRoute);
router.use('/budget', budgetRoute);
router.use('/export', exportRoute);





export default router;