const AulaRepository = require('../repositories/AulaRepository');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/response');

class AulaController {
  constructor() {
    this.aulaRepository = new AulaRepository();
  }

  getHorarios = asyncHandler(async (req, res) => {
    const horarios = await this.aulaRepository.findWithDetails();
    return ApiResponse.success(res, horarios);
  });

  createAula = asyncHandler(async (req, res) => {
    const aula = await this.aulaRepository.create(req.body);
    return ApiResponse.success(res, aula, 'Aula created successfully', 201);
  });
}

module.exports = AulaController;