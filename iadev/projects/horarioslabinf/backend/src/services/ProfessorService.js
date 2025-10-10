const ProfessorRepository = require('../repositories/ProfessorRepository');

class ProfessorService {
  constructor() {
    this.professorRepository = new ProfessorRepository();
  }

  async getAllProfessores() {
    return this.professorRepository.findAll();
  }

  async getProfessorById(id) {
    const professor = await this.professorRepository.findById(id);
    if (!professor) {
      throw new Error('Professor not found');
    }
    return professor;
  }

  async createProfessor(data) {
    return this.professorRepository.create(data);
  }

  async updateProfessor(id, data) {
    await this.getProfessorById(id);
    return this.professorRepository.update(id, data);
  }

  async deleteProfessor(id) {
    await this.getProfessorById(id);
    return this.professorRepository.delete(id);
  }
}

module.exports = ProfessorService;