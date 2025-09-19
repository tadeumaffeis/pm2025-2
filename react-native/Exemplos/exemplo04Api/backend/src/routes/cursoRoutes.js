const express = require('express');
const cursoController = require('../controllers/cursoController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       required:
 *         - sigla
 *         - nome
 *         - email
 *       properties:
 *         sigla:
 *           type: string
 *         nome:
 *           type: string
 *         email:
 *           type: string
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Array JSON com todos os cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *             example:
 *               - sigla: "ADS"
 *                 nome: "Análise e Desenvolvimento de Sistemas"
 *                 email: "ads@exemplo.com"
 *               - sigla: "ENG"
 *                 nome: "Engenharia de Software"
 *                 email: "eng@exemplo.com"
 *   post:
 *     summary: Cria novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Curso criado
 */

/**
 * @swagger
 * /api/cursos/{sigla}:
 *   get:
 *     summary: Busca curso por sigla
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso encontrado
 *   put:
 *     summary: Atualiza curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 nullable: true
 *               email:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Curso atualizado
 *   delete:
 *     summary: Remove curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso deletado
 */

router.get('/', cursoController.getAll);
router.get('/:sigla', cursoController.getById);
router.post('/', cursoController.create);
router.put('/:sigla', cursoController.update);
router.delete('/:sigla', cursoController.delete);

module.exports = router;