const BaseRepository = require('../../repositories/BaseRepository');

class Usuario extends BaseRepository {
  constructor() {
    super('USUARIO');
  }

  async findByUsername(username) {
    const query = `SELECT * FROM ${this.tableName} WHERE username = ? AND ativo = TRUE`;
    const [rows] = await this.db.execute(query, [username]);
    return rows[0] || null;
  }

  async create(userData) {
    const { username, password_hash, role = 'user' } = userData;
    const query = `
      INSERT INTO ${this.tableName} (username, password_hash, role) 
      VALUES (?, ?, ?)
    `;
    const [result] = await this.db.execute(query, [username, password_hash, role]);
    return result.insertId;
  }
}

module.exports = Usuario;