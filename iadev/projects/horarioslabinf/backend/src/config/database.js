const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

let mysqlPool = null;

const connectMySQL = async () => {
  try {
    mysqlPool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log('MySQL pool created successfully');
    return mysqlPool;
  } catch (error) {
    console.error('MySQL pool creation failed:', error);
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

const getMySQLConnection = () => mysqlPool;

module.exports = {
  connectMySQL,
  connectMongoDB,
  getMySQLConnection,
};