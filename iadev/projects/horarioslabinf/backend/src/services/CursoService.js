const CursoRepository = require('../repositories/CursoRepository');
const LogService = require('./LogService');

class CursoService {
  constructor() {
    this.cursoRepository = new CursoRepository();
    this.logService = new LogService();
  }

  async getAllCursos(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const cursos = await this.cursoRepository.findAll({}, limit, offset);
    const total = await this.cursoRepository.count();
    
    return {
      cursos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getCursoById(id) {
    const curso = await this.cursoRepository.findById(id);
    if (!curso) {
      throw new Error('Curso not found');
    }
    return curso;
  }

  async createCurso(data, userId) {
    const curso = await this.cursoRepository.create(data);
    await this.logService.log('CREATE', 'CURSO', curso.id_curso, userId, data);
    return curso;
  }

  async updateCurso(id, data, userId) {
    await this.getCursoById(id);
    const updatedCurso = await this.cursoRepository.update(id, data);
    await this.logService.log('UPDATE', 'CURSO', id, userId, data);
    return updatedCurso;
  }

  async deleteCurso(id, userId) {
    await this.getCursoById(id);
    const deleted = await this.cursoRepository.delete(id);
    
    if (deleted) {
      await this.logService.log('DELETE', 'CURSO', id, userId);
    }
    
    return deleted;
  }


}

module.exports = CursoService;