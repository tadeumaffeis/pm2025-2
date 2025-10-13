const express = require('express');
const CursoController = require('../controllers/CursoController');
const { auth, requireRole } = require('../middleware/auth');
const { validateCreateCurso, validateUpdateCurso } = require('../validators/cursoValidator');

const router = express.Router();
const cursoController = new CursoController();

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Course management endpoints
 */

router.get('/', cursoController.getAllCursos);
router.get('/:id', cursoController.getCursoById);
router.post('/', auth, requireRole(['admin']), validateCreateCurso, cursoController.createCurso);
router.put('/:id', auth, requireRole(['admin']), validateUpdateCurso, cursoController.updateCurso);
router.delete('/:id', auth, requireRole(['admin']), cursoController.deleteCurso);

module.exports = router;