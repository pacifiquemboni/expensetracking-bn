'use strict';

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configSuffix = env === 'development' ? '.ts' : '.js';
const config = require(path.join(__dirname, `../config/config.js`))[env];
const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    const isValidFile =
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === (env === 'development' ? '.ts' : '.js') &&
      file.indexOf('.test.js') === -1;

    return isValidFile;
  })
  .forEach(async (file) => {
    console.log(`Loading model from file: ${file}`);
    await import(path.join(__dirname, file)).then((module) => {
      const model = module.default(sequelize, DataTypes);
      db[model.name] = model;
    });
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { db, sequelize };
