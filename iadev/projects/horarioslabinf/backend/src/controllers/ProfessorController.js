const ProfessorService = require('../services/ProfessorService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/response');

class ProfessorController {
  constructor() {
    this.professorService = new ProfessorService();
  }

  getAllProfessores = asyncHandler(async (req, res) => {
    const professores = await this.professorService.getAllProfessores();
    return ApiResponse.success(res, professores);
  });

  getProfessorById = asyncHandler(async (req, res) => {
    const professor = await this.professorService.getProfessorById(req.params.id);
    return ApiResponse.success(res, professor);
  });

  createProfessor = asyncHandler(async (req, res) => {
    const professor = await this.professorService.createProfessor(req.body);
    return ApiResponse.success(res, professor, 'Professor created successfully', 201);
  });

  updateProfessor = asyncHandler(async (req, res) => {
    const professor = await this.professorService.updateProfessor(req.params.id, req.body);
    return ApiResponse.success(res, professor, 'Professor updated successfully');
  });

  deleteProfessor = asyncHandler(async (req, res) => {
    await this.professorService.deleteProfessor(req.params.id);
    return ApiResponse.success(res, null, 'Professor deleted successfully');
  });
}

module.exports = ProfessorController;