# Expense Tracking Application

This is an Expense Tracking application built with Node.js, Express, Sequelize, and PostgreSQL. The application allows users to manage their expenses, categories, subcategories, and budgets.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Features

- User authentication and authorization
- Manage categories and subcategories
- Track expenses and incomes
- Create and manage budgets
- Export data to CSV

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/pacifiquemboni/expensetracking-bn.git
   cd expensetracking

 # 2. Install dependencies:
  npm install

 # 3.Set up environment variables:

Create a .env file in the root directory and add the following variables:

NODE_ENV=development
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

# 4.Run database migrations:

npm run migrate

# 5.Start the development server:
npm run dev

## Usage
# Authentication
Register a new user: POST /api/auth/register
Login: POST /api/auth/login
# Categories
Create a new category: POST /api/categories/register
Get all categories: GET /api/categories
Update a category: PUT /api/categories/:id
Delete a category: DELETE /api/categories/:id

# Subcategories
Create a new subcategory: POST /api/categories/register/sub
Get all subcategories for a category: GET /api/categories/:categoryId/subcategories
Update a subcategory: PUT /api/categories/sub/:id
Delete a subcategory: DELETE /api/categories/sub/:id
# Transactions
Create a new transaction: POST /api/transactions/create
Get a single transaction by ID: GET /api/transactions/:id
Get all transactions: GET /api/transactions
Get all expense transactions with total amount for a user: GET /api/transactions/expenses/total/:user_id
Update a transaction: PUT /api/transactions/:id
Delete a transaction: DELETE /api/transactions/:id

# Budgets
Create a new budget: POST /api/budgets/create/:user_id
Get the active budget for a user: GET /api/budgets/active/:user_id
Update the status of a budget: PUT /api/budgets/status/:id
# Export
Export transactions to CSV: GET /api/export
