const express = require('express');
const AulaController = require('../controllers/AulaController');
const auth = require('../middleware/auth');

const router = express.Router();
const aulaController = new AulaController();

router.get('/horarios', aulaController.getHorarios);
router.post('/', auth, aulaController.createAula);

module.exports = router;