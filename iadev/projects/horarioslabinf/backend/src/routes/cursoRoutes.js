const express = require('express');
const CursoController = require('../controllers/CursoController');
const auth = require('../middleware/auth');
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
router.post('/', auth, validateCreateCurso, cursoController.createCurso);
router.put('/:id', auth, validateUpdateCurso, cursoController.updateCurso);
router.delete('/:id', auth, cursoController.deleteCurso);

module.exports = router;