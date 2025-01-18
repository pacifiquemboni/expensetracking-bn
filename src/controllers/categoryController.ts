import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/models';

export default class CategoryController {
    static async registerCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.userId; // Get userId from the URL parameter
            const { name, type } = req.body;

            // Check if the Category already exists
            const existingCategory = await db.Category.findOne({ where: { name, userId } });
            if (existingCategory) {
                res.status(400).json({ message: 'Category already exists' });
            }
            // Create a new Category
            const newCategory = await db.Category.create({
                id: uuidv4(),
                userId,
                name,
                type,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            res.status(201).json({ message: 'Category registered successfully', category: newCategory });
        } catch (error) {
            console.error('Error registering category:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId; // Get userId from the URL parameter
            if (!userId) {
                return res.status(401).json({ message: 'UserId is Missing' });
            }
            const categories = await db.Category.findAll({ where: { userId } });
            return res.status(200).json({ categories });
        } catch (error) {
            console.error('Error fetching categories:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, type } = req.body;

            const category = await db.Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await category.update({
                name: name || category.name,
                type: type || category.type,
                updatedAt: new Date()
            });

            return res.status(200).json({ message: 'Category updated successfully', category });
        } catch (error) {
            console.error('Error updating category:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const category = await db.Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await category.destroy();
            return res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async registerSubCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, category_id } = req.body;

            // Check if the SubCategory already exists
            const existingSubCategory = await db.SubCategory.findOne({ where: { name, category_id } });
            if (existingSubCategory) {
                return res.status(400).json({ message: 'SubCategory already exists' });
            }
console.log('category_id', category_id);

            // Create a new SubCategory
            const newSubCategory = await db.SubCategory.create({
                id: uuidv4(),
                category_id,
                name,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return res.status(201).json({ message: 'SubCategory registered successfully', subCategory: newSubCategory });
        } catch (error) {
            console.error('Error registering subCategory:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    static async getAllSubCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const { categoryId } = req.params;
            const subCategories = await db.SubCategory.findAll({ where: { category_id: categoryId } });
            return res.status(200).json({ subCategories });
        } catch (error) {
            console.error('Error fetching subCategories:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateSubCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const subCategory = await db.SubCategory.findByPk(id);
            if (!subCategory) {
                return res.status(404).json({ message: 'SubCategory not found' });
            }

            await subCategory.update({
                name: name || subCategory.name,
                updatedAt: new Date()
            });

            return res.status(200).json({ message: 'SubCategory updated successfully', subCategory });
        } catch (error) {
            console.error('Error updating subCategory:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteSubCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const subCategory = await db.SubCategory.findByPk(id);
            if (!subCategory) {
                return res.status(404).json({ message: 'SubCategory not found' });
            }

            await subCategory.destroy();
            return res.status(200).json({ message: 'SubCategory deleted successfully' });
        } catch (error) {
            console.error('Error deleting subCategory:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}