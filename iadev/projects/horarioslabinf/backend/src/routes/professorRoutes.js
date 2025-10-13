const express = require('express');
const ProfessorController = require('../controllers/ProfessorController');
const { auth } = require('../middleware/auth');

const router = express.Router();
const professorController = new ProfessorController();

router.get('/', professorController.getAllProfessores);
router.get('/:id', professorController.getProfessorById);
router.post('/', auth, professorController.createProfessor);
router.put('/:id', auth, professorController.updateProfessor);
router.delete('/:id', auth, professorController.deleteProfessor);

module.exports = router;