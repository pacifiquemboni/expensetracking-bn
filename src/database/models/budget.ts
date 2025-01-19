'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class Budget extends Model {
    static associate(models: any) {
      // Define associations here
      Budget.belongsTo(models.User, { foreignKey: 'user_id' });
      Budget.belongsTo(models.Category, { foreignKey: 'category_id' });
    }
  }

  Budget.init(
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
      category_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Categories', // Adjust to the name of your categories table
          key: 'id',
        },
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Budget',
      tableName: 'Budgets',
    }
  );

  return Budget;
};
