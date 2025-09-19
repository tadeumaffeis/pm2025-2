const express = require('express');
const cursoRoutes = require('./cursoRoutes');

const router = express.Router();

router.use('/cursos', cursoRoutes);

module.exports = router;