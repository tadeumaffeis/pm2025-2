class Professor {
  constructor(data) {
    this.id_professor = data.id_professor;
    this.nome = data.nome;
  }

  static tableName = 'PROFESSOR';

  toJSON() {
    return {
      id_professor: this.id_professor,
      nome: this.nome,
    };
  }
}

module.exports = Professor;