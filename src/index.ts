import express from "express";
import { sequelize } from "./database/config/database";
import * as dotenv from 'dotenv';
import routes from "./routes";
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Use routes
app.use('/api', routes);

// Test the database connection here
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
