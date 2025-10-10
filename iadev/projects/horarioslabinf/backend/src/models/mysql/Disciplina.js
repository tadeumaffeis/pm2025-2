class Disciplina {
  constructor(data) {
    this.id_disciplina = data.id_disciplina;
    this.nome = data.nome;
    this.id_curso = data.id_curso;
    this.id_professor = data.id_professor;
  }

  static tableName = 'DISCIPLINA';

  toJSON() {
    return {
      id_disciplina: this.id_disciplina,
      nome: this.nome,
      id_curso: this.id_curso,
      id_professor: this.id_professor,
    };
  }
}

module.exports = Disciplina;