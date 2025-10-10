class Curso {
  constructor(data) {
    this.id_curso = data.id_curso;
    this.nome = data.nome;
  }

  static tableName = 'CURSO';

  toJSON() {
    return {
      id_curso: this.id_curso,
      nome: this.nome,
    };
  }
}

module.exports = Curso;