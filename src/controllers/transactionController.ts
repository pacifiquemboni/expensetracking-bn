import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {db} from '../database/models';

export default class TransactionController {
    static async createTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user_id = req.params.user_id; // Get user_id from the URL parameter
            if (!user_id) {
                 res.status(401).json({ message: 'UserId is Missing' });
            }
            const {  account, type, amount, category_id, sub_category_id, description } = req.body;

            // Ensure sub_category_id is either a valid UUID or null
            const validSubCategoryId = sub_category_id ? sub_category_id : null;

            // Create a new Transaction
            const newTransaction = await db.Transaction.create({
                id: uuidv4(),
                user_id,
                account,
                type,
                amount,
                category_id,
                sub_category_id: validSubCategoryId,
                description,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            res.status(201).json({ message: 'Transaction Created successfully', transaction: newTransaction });
        } catch (error) {
            console.error('Error creating Transaction:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
    static async getUserTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user_id = req.params.user_id; // Get userId from the URL parameter
            if (!user_id) {
                res.status(401).json({ message: 'UserId is Missing' });
            }
            const transactions = await db.Transaction.findAll({ where: { user_id } });
            res.status(200).json({ transactions });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async getUserExpenseTransactionsWithTotal(req: Request, res: Response, next: NextFunction){
        try {
            const user_id = req.params.user_id; // Get userId from the URL parameter
            if (!user_id) {
                return res.status(401).json({ message: 'UserId is Missing' });
            }

            const transactions = await db.Transaction.findAll({
                where: { user_id, type: 'expense' }
            });

            const totalAmount = transactions.reduce((total: number, transaction: { amount: string; }) => total + parseFloat(transaction.amount), 0);

            res.status(200).json({ transactions, totalAmount });
        } catch (error) {
            console.error('Error fetching expense transactions:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
    static async getUserIncomeTransactionsWithTotal(req: Request, res: Response, next: NextFunction){
        try {
            const user_id = req.params.user_id; // Get userId from the URL parameter
            if (!user_id) {
                return res.status(401).json({ message: 'UserId is Missing' });
            }

            const transactions = await db.Transaction.findAll({
                where: { user_id, type: 'income' }
            });

            const totalAmount = transactions.reduce((total: number, transaction: { amount: string; }) => total + parseFloat(transaction.amount), 0);

            res.status(200).json({ transactions, totalAmount });
        } catch (error) {
            console.error('Error fetching expense transactions:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
    static async getAllTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transactions = await db.Transaction.findAll();
            res.status(200).json({ transactions });
        } catch (error) {
            console.error('Error fetching Transactions:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
    static async updateTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { account, type, amount, category_id, sub_category_id, description } = req.body;

            const transaction = await db.Transaction.findByPk(id);
            if (!transaction) {
                 res.status(404).json({ message: 'Transaction not found' });
            }

            const validSubCategoryId = sub_category_id ? sub_category_id : null;

            await transaction.update({
                account: account || transaction.account,
                type: type || transaction.type,
                amount: amount || transaction.amount,
                category_id: category_id || transaction.category_id,
                sub_category_id: validSubCategoryId,
                description: description || transaction.description,
                updatedAt: new Date()
            });
            res.status(200).json({ message: 'Transaction updated successfully', transaction });
        } catch (error) {
            console.error('Error updating Transaction:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
    static async deleteTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const transaction = await db.Transaction.findByPk(id);
            if (!transaction) {
                 res.status(404).json({ message: 'Transaction not found' });
            }

            await transaction.destroy();
            res.status(200).json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            console.error('Error deleting Transaction:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

}