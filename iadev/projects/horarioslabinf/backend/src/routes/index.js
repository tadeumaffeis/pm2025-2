const express = require('express');
const authRoutes = require('./authRoutes');
const cursoRoutes = require('./cursoRoutes');
const professorRoutes = require('./professorRoutes');
const aulaRoutes = require('./aulaRoutes');

const router = express.Router();

// API Routes
router.use('/auth', authRoutes);
router.use('/cursos', cursoRoutes);
router.use('/professores', professorRoutes);
router.use('/aulas', aulaRoutes);

// API Info
router.get('/', (req, res) => {
  res.json({
    message: 'Horários Lab API v1.0.0',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      cursos: '/api/v1/cursos',
      professores: '/api/v1/professores',
      aulas: '/api/v1/aulas',
      docs: '/api-docs'
    }
  });
});

module.exports = router;