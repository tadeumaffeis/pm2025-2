class Laboratorio {
  constructor(data) {
    this.id_laboratorio = data.id_laboratorio;
    this.nome = data.nome;
    this.qtd_computadores = data.qtd_computadores;
  }

  static tableName = 'LABORATORIO';

  toJSON() {
    return {
      id_laboratorio: this.id_laboratorio,
      nome: this.nome,
      qtd_computadores: this.qtd_computadores,
    };
  }
}

module.exports = Laboratorio;