'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class Transaction extends Model {
    static associate(models: any) {
      // Define associations here
      Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
      Transaction.belongsTo(models.Category, { foreignKey: 'category_id' });
      Transaction.belongsTo(models.SubCategory, { foreignKey: 'sub_category_id' });
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users', // Adjust to the name of your users table
          key: 'id',
        },
      },
      account: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['income', 'expense']], // Enforces specific values
        },
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Categories', // Adjust to the name of your categories table
          key: 'id',
        },
      },
      sub_category_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'SubCategories', // Adjust to the name of your subcategories table
          key: 'id',
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'Transactions',
    }
  );

  return Transaction;
};
