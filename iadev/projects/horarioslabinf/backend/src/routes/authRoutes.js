const express = require('express');
const AuthController = require('../controllers/AuthController');
const { auth } = require('../middleware/auth');
const { validateLogin } = require('../validators/authValidator');

const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

router.post('/login', validateLogin, authController.login);
router.get('/verify', auth, authController.verify);
router.post('/refresh', auth, authController.refresh);

module.exports = router;