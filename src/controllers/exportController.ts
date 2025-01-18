import { exportToExcel, exportToPDF } from '../utils/exportUtils';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import {db} from '../database/models';


export const exportExcel: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({ message: 'Start date and end date are required' });
    }

    // Query the database for transactions within the specified date range
    const transactions = await db.Transaction.findAll({
      where: {
        createdAt: {
          [db.Sequelize.Op.between]: [new Date(startDate as string), new Date(endDate as string)],
        },
      },
    });

    if (transactions.length === 0) {
       res.status(404).json({ message: 'No transactions found for the given date range' });
    }

    // Convert transactions to a format suitable for Excel export
    const data = transactions.map((transaction: any) => ({
      ID: transaction.id,
      UserID: transaction.user_id,
      Account: transaction.account,
      Type: transaction.type,
      Amount: transaction.amount,
      CategoryID: transaction.category_id,
      SubCategoryID: transaction.sub_category_id,
      Description: transaction.description,
      CreatedAt: transaction.createdAt,
      UpdatedAt: transaction.updatedAt,
    }));

    // Export data to Excel
    const filePath = exportToExcel(data, 'Transactions');
    res.download(filePath, 'Transactions.xlsx', (err: any) => {
      if (err) console.error('Error downloading Excel:', err);
    });
  } catch (error) {
    console.error('Error exporting Excel:', error);
    res.status(500).json({ message: 'Internal server error',error });
  }
};

export const exportPDF = async (req: any, res: { download: (arg0: string, arg1: string, arg2: (err: any) => void) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  try {
    const data = [
      { Name: 'John Doe', Age: 30, Email: 'john@example.com' },
      { Name: 'Jane Doe', Age: 25, Email: 'jane@example.com' },
    ];
    const filePath = exportToPDF(data, 'UserData');
    res.download(filePath, 'UserData.pdf', (err: any) => {
      if (err) console.error('Error downloading PDF:', err);
    });
  } catch (error) {
    console.error('Error exporting PDF:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
