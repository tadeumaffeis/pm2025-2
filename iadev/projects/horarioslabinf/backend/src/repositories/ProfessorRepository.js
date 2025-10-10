const BaseRepository = require('./BaseRepository');
const Professor = require('../models/mysql/Professor');

class ProfessorRepository extends BaseRepository {
  constructor() {
    super(Professor);
  }
}

module.exports = ProfessorRepository;