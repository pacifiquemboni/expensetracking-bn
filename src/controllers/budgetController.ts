import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {db} from '../database/models';

export default class BudgetController {
    static async createBudget(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user_id = req.params.user_id; // Get user_id from the URL parameter
            if (!user_id) {
                 res.status(401).json({ message: 'UserId is Missing' });
            }
            const {   amount, category_id, start_date , end_date } = req.body;

           
            // Create a new Budget
            const newBudget = await db.Budget.create({
                id: uuidv4(),
                user_id,
                amount,
                category_id,
                start_date,
                end_date,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            res.status(201).json({ message: 'Budget Created successfully', Budget: newBudget });
        } catch (error) {
            console.error('Error creating Budget:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
}
