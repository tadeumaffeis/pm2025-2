const mysql = require('mysql2/promise');
const config = require('../../config');

class MySQLConnection {
  constructor() {
    this.pool = null;
  }

  async connect() {
    try {
      this.pool = mysql.createPool({
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      console.log('MySQL connected successfully');
      return this.pool;
    } catch (error) {
      console.error('MySQL connection error:', error);
      throw error;
    }
  }

  getPool() {
    if (!this.pool) {
      throw new Error('MySQL pool not initialized. Call connect() first.');
    }
    return this.pool;
  }

  async disconnect() {
    if (this.pool) {
      await this.pool.end();
      console.log('MySQL disconnected');
    }
  }
}

module.exports = new MySQLConnection();