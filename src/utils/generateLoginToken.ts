import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (
  id: string,
  email: string,
  name: string,
 role: string,
): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret not defined');
  }
  return jwt.sign(
    {
      id,
      email,
      name,
      role
    },
    secret,
    { expiresIn: '1h' }
  );
};