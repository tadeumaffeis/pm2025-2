class Aula {
  constructor(data) {
    this.id_aula = data.id_aula;
    this.id_disciplina = data.id_disciplina;
    this.id_laboratorio = data.id_laboratorio;
    this.id_horario = data.id_horario;
    this.id_dia = data.id_dia;
  }

  static tableName = 'AULA';

  toJSON() {
    return {
      id_aula: this.id_aula,
      id_disciplina: this.id_disciplina,
      id_laboratorio: this.id_laboratorio,
      id_horario: this.id_horario,
      id_dia: this.id_dia,
    };
  }
}

module.exports = Aula;