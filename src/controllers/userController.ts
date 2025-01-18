import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { db } from '../database/models';
import { generateToken } from '../utils/generateLoginToken';
const secret = process.env.JWT_SECRET;

export default class UserController {
    static async registerUser(req: Request, res: Response, next: unknown) {
        try {
            const { name, email, password } = req.body;
            // Check if the user already exists
            const existingUser = await db.User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = await db.User.create({
                id: uuidv4(),
                name,
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getSingleUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ user });
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await db.User.findAll();
            return res.status(200).json({ users });
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            const user = await db.User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

            await user.update({
                name: name || user.name,
                email: email || user.email,
                password: hashedPassword,
                updatedAt: new Date()
            });

            return res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const user = await db.User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await user.destroy();
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            // Check if the user exists
            const user = await db.User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Check if the password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Generate a JWT token
            const token = generateToken(
                user.id,
                user.email,
                user.name,
                user.role,
            );
            const userRole = user.role
            return res.status(200).json({ message: 'Login successful', token, userRole });
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}