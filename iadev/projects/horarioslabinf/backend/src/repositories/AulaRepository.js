const BaseRepository = require('./BaseRepository');
const Aula = require('../models/mysql/Aula');
const { getMySQLConnection } = require('../config/database');

class AulaRepository extends BaseRepository {
  constructor() {
    super(Aula);
  }

  async findWithDetails() {
    const connection = getMySQLConnection();
    const [rows] = await connection.execute(`
      SELECT 
        a.*,
        d.nome as disciplina_nome,
        l.nome as laboratorio_nome,
        h.inicio, h.fim,
        ds.nome as dia_nome
      FROM AULA a
      JOIN DISCIPLINA d ON a.id_disciplina = d.id_disciplina
      JOIN LABORATORIO l ON a.id_laboratorio = l.id_laboratorio
      JOIN HORARIO h ON a.id_horario = h.id_horario
      JOIN DIA_SEMANA ds ON a.id_dia = ds.id_dia
    `);
    return rows;
  }
}

module.exports = AulaRepository;