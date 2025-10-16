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
    message: 'API Online',
    status: 'active'
  });
});

module.exports = router;