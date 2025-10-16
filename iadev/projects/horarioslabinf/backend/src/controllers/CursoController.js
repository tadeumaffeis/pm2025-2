const CursoService = require('../services/CursoService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/response');

class CursoController {
  constructor() {
    this.cursoService = new CursoService();
  }

  /**
   * @swagger
   * /cursos:
   *   get:
   *     summary: Get all courses
   *     tags: [Cursos]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Items per page
   *     responses:
   *       200:
   *         description: List of courses
   */
  getAllCursos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const result = await this.cursoService.getAllCursos(page, limit);
    
    return ApiResponse.paginated(res, result.cursos, result.pagination);
  });

  /**
   * @swagger
   * /cursos/{id}:
   *   get:
   *     summary: Get course by ID
   *     tags: [Cursos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Course details
   *       404:
   *         description: Course not found
   */
  getCursoById = asyncHandler(async (req, res) => {
    const curso = await this.cursoService.getCursoById(req.params.id);
    return ApiResponse.success(res, curso);
  });

  /**
   * @swagger
   * /cursos:
   *   post:
   *     summary: Create new course
   *     tags: [Cursos]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *             properties:
   *               nome:
   *                 type: string
   *                 minLength: 2
   *                 maxLength: 100
   *                 example: "Análise e Desenvolvimento de Sistemas"
   *     responses:
   *       201:
   *         description: Course created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Course created successfully
   *                 data:
   *                   type: object
   *                   properties:
   *                     id_curso:
   *                       type: integer
   *                       example: 1
   *                     nome:
   *                       type: string
   *                       example: "Análise e Desenvolvimento de Sistemas"
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Insufficient permissions
   */
  createCurso = asyncHandler(async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const curso = await this.cursoService.createCurso(req.body, userId);
    return ApiResponse.success(res, curso, 'Course created successfully', 201);
  });

  /**
   * @swagger
   * /cursos/{id}:
   *   put:
   *     summary: Update course
   *     tags: [Cursos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Course ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 minLength: 2
   *                 maxLength: 100
   *                 example: "Análise e Desenvolvimento de Sistemas"
   *     responses:
   *       200:
   *         description: Course updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Course updated successfully
   *                 data:
   *                   type: object
   *                   properties:
   *                     id_curso:
   *                       type: integer
   *                       example: 1
   *                     nome:
   *                       type: string
   *                       example: "Análise e Desenvolvimento de Sistemas"
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Insufficient permissions
   *       404:
   *         description: Course not found
   */
  updateCurso = asyncHandler(async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const curso = await this.cursoService.updateCurso(req.params.id, req.body, userId);
    return ApiResponse.success(res, curso, 'Course updated successfully');
  });

  /**
   * @swagger
   * /cursos/{id}:
   *   delete:
   *     summary: Delete course
   *     tags: [Cursos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Course deleted successfully
   */
  deleteCurso = asyncHandler(async (req, res) => {
    const userId = req.user ? req.user.id : null;
    await this.cursoService.deleteCurso(req.params.id, userId);
    return ApiResponse.success(res, null, 'Course deleted successfully');
  });


}

module.exports = CursoController;