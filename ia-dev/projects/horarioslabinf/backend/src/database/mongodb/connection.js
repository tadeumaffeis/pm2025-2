const mongoose = require('mongoose');
const config = require('../../config');

class MongoDBConnection {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mongoose.connect(config.mongodb.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('MongoDB connected successfully');
      return this.connection;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  getConnection() {
    if (!this.connection) {
      throw new Error('MongoDB not connected. Call connect() first.');
    }
    return this.connection;
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    }
  }
}

module.exports = new MongoDBConnection();