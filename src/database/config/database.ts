import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

const isDevelopment = process.env.NODE_ENV === 'development';

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  dialectOptions: isDevelopment ? {} : {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This line allows self-signed certificates
    },
  },
});

export { sequelize };
