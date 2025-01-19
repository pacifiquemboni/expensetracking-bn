import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/models';

export default class BudgetController {
    static async createBudget(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.params.user_id; // Get user_id from the URL parameter
            if (!user_id) {
                return res.status(401).json({ message: 'UserId is Missing' });
            }
            const { amount, category_id, start_date, end_date } = req.body;
            // Validate that start_date and end_date are not in the past
            const currentDate = new Date();
            const startDate = new Date(start_date);
            const endDate = new Date(end_date);

            if (startDate < currentDate) {
                return res.status(400).json({ message: 'Start date cannot be in the past' });
            }

            if (endDate < currentDate) {
                return res.status(400).json({ message: 'End date cannot be in the past' });
            }

            if (endDate < startDate) {
                return res.status(400).json({ message: 'End date cannot be before start date' });
            }
            // Check if there is any other active budget created by the same user
            const existingActiveBudget = await db.Budget.findOne({
                where: {
                    user_id,
                    status: 'active'
                }
            });

            if (existingActiveBudget) {
                return res.status(400).json({ message: 'An active budget already exists for this user' });
            }

            // Create a new Budget
            const newBudget = await db.Budget.create({
                id: uuidv4(),
                user_id,
                amount,
                category_id,
                status: 'active', // Set the status to active
                start_date,
                end_date,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            res.status(201).json({ message: 'Budget created successfully', budget: newBudget });
        } catch (error) {
            console.error('Error creating budget:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    static async getActiveBudget(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.params.user_id; // Get user_id from the URL parameter
            if (!user_id) {
                res.status(401).json({ message: 'UserId is Missing' });
            }

            // Fetch the active budget for the given user
            const activeBudget = await db.Budget.findOne({
                where: {
                    user_id,
                    status: 'active'
                }
            });

            if (!activeBudget) {
                return res.status(404).json({ message: 'No active budget found for this user' });
            }

            res.status(200).json({  activeBudget });
        } catch (error) {
            console.error('Error fetching active budget:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    static async updateBudgetStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const budget = await db.Budget.findByPk(id);
            if (!budget) {
                return res.status(404).json({ message: 'Budget not found' });
            }

            await budget.update({
                status,
                updatedAt: new Date()
            });

            res.status(200).json({ message: 'Budget status updated successfully', budget });
        } catch (error) {
            console.error('Error updating budget status:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Other methods...
}
