import express, { Router } from 'express';
import { exportExcel } from '../controllers/exportController';

const router: Router = express.Router();

// Export transactions to Excel
router.get('/excel',  exportExcel);

export default router;
