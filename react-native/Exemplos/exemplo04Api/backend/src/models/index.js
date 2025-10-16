const sequelize = require('../config/database');
const Curso = require('./Curso');

const models = {
  Curso
};

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao PostgreSQL');
    
    await sequelize.sync();
    console.log('Modelos sincronizados');
  } catch (err) {
    console.error('Erro ao conectar:', err);
    process.exit(1);
  }
};

module.exports = { ...models, sequelize, connectDB };