import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Replace with your actual secret
    const payload = jwt.verify(token, secretKey) as { id: string; }; // Decode token
    req.user = { id: payload.id }; // Attach user ID to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
