const BaseRepository = require('./BaseRepository');
const Curso = require('../models/mysql/Curso');

class CursoRepository extends BaseRepository {
  constructor() {
    super(Curso);
  }


}

module.exports = CursoRepository;