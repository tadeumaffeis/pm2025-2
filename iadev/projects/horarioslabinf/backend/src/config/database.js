const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

let mysqlConnection = null;

const connectMySQL = async () => {
  try {
    mysqlConnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    console.log('MySQL connected successfully');
    return mysqlConnection;
  } catch (error) {
    console.error('MySQL connection failed:', error);
    throw error;
  }
};

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.warn('MongoDB connection failed, continuing without it:', error.message);
  }
};

const getMySQLConnection = () => mysqlConnection;

module.exports = {
  connectMySQL,
  connectMongoDB,
  getMySQLConnection,
};