const dotenv = require('dotenv');

dotenv.config();

const commonConfig = {
  dialect: 'postgres',
};

const sslConfig = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: process.env.NODE_ENV === 'development' ? {} : sslConfig,
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: sslConfig,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: sslConfig,
  },
};
