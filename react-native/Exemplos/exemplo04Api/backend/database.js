const { Client } = require('pg');

const client = new Client({
  host: "pm2025-2-postgresql-container",
  port: 5432,
  database: "pm20252db",
  user: "pm20252",
  password: "pm20252"
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Conectado ao PostgreSQL');
    
    // Criar tabela cursos se não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS cursos (
        sigla VARCHAR(50) PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(50)
      );
    `);
    console.log('Tabela cursos criada/verificada');
  } catch (err) {
    console.error('Erro ao conectar com o banco:', err);
  }
};

module.exports = { client, connectDB };