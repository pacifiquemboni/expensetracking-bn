'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class Category extends Model {
    static associate(models: any) {
      // Define association here
      Category.belongsTo(models.User, { foreignKey: 'user_id' });
      Category.hasMany(models.SubCategory, { foreignKey: 'category_id' });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users', // The name of your users table
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type :{
        type: DataTypes.STRING,//  Indicates whether the category applies to income, expense, or both.
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories', // Optional: Specify table name explicitly
    }
  );

  return Category;
};
