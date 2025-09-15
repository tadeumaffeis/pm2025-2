const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "pm20252db",
  user: "pm20252",
  password: "pm20252"
});

async function criarTabelaCursos() {
  try {
    await client.connect();
    console.log("Conectado ao PostgreSQL");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS cursos (
        sigla VARCHAR(50) PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(50)
      );
    `;

    await client.query(createTableQuery);
    console.log('Tabela "cursos" criada com sucesso!');
  } catch (error) {
    console.error("Erro:", error);
  } finally {
    await client.end();
    console.log("Conexão encerrada");
  }
}

criarTabelaCursos();
