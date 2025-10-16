const { getMySQLConnection } = require('../config/database');

class BaseRepository {
  constructor(model) {
    this.model = model;
    this.tableName = model.tableName;
    this.connection = null;
  }

  getConnection() {
    if (!this.connection) {
      this.connection = getMySQLConnection();
    }
    return this.connection;
  }

  async findAll(conditions = {}, limit = null, offset = 0) {
    const connection = this.getConnection();
    let query = `SELECT * FROM ${this.tableName}`;
    const params = [];

    if (Object.keys(conditions).length > 0) {
      const whereClause = Object.keys(conditions)
        .map(key => `${key} = ?`)
        .join(' AND ');
      query += ` WHERE ${whereClause}`;
      params.push(...Object.values(conditions));
    }

    if (limit) {
      query += ` LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    }

    const [rows] = await connection.execute(query, params);
    return rows.map(row => new this.model(row));
  }

  async findById(id) {
    const connection = this.getConnection();
    const idField = this.getIdField();
    const [rows] = await connection.execute(
      `SELECT * FROM ${this.tableName} WHERE ${idField} = ?`,
      [id]
    );
    return rows.length > 0 ? new this.model(rows[0]) : null;
  }

  getIdField() {
    const tableIdMap = {
      'CURSO': 'id_curso',
      'PROFESSOR': 'id_professor',
      'DISCIPLINA': 'id_disciplina',
      'LABORATORIO': 'id_laboratorio',
      'HORARIO': 'id_horario',
      'DIA_SEMANA': 'id_dia',
      'AULA': 'id_aula'
    };
    return tableIdMap[this.tableName] || 'id';
  }

  async create(data) {
    const connection = this.getConnection();
    const fields = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const [result] = await connection.execute(
      `INSERT INTO ${this.tableName} (${fields}) VALUES (${placeholders})`,
      values
    );

    return this.findById(result.insertId);
  }

  async update(id, data) {
    const connection = this.getConnection();
    const idField = this.getIdField();
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    await connection.execute(
      `UPDATE ${this.tableName} SET ${fields} WHERE ${idField} = ?`,
      values
    );

    return this.findById(id);
  }

  async delete(id) {
    const connection = this.getConnection();
    const idField = this.getIdField();
    const [result] = await connection.execute(
      `DELETE FROM ${this.tableName} WHERE ${idField} = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }

  async count(conditions = {}) {
    const connection = this.getConnection();
    let query = `SELECT COUNT(*) as total FROM ${this.tableName}`;
    const params = [];

    if (Object.keys(conditions).length > 0) {
      const whereClause = Object.keys(conditions)
        .map(key => `${key} = ?`)
        .join(' AND ');
      query += ` WHERE ${whereClause}`;
      params.push(...Object.values(conditions));
    }

    const [rows] = await connection.execute(query, params);
    return rows[0].total;
  }
}

module.exports = BaseRepository;