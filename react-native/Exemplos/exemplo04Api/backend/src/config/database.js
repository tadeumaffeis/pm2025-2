const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'pm20252db',
  process.env.DB_USER || 'pm20252',
  process.env.DB_PASS || 'pm20252',
  {
    host: process.env.DB_HOST || 'pm2025-2-postgresql-container',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;