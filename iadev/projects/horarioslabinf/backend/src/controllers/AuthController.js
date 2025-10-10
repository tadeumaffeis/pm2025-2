const AuthService = require('../services/AuthService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/response');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: User login
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   *       401:
   *         description: Invalid credentials
   */
  login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const result = await this.authService.login(username, password, req);
      return ApiResponse.success(res, result, 'Login successful');
    } catch (error) {
      return ApiResponse.error(res, error.message, 401);
    }
  });

  /**
   * @swagger
   * /auth/verify:
   *   get:
   *     summary: Verify token
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Token is valid
   *       401:
   *         description: Invalid token
   */
  verify = asyncHandler(async (req, res) => {
    return ApiResponse.success(res, req.user, 'Token is valid');
  });

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     summary: Refresh token
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Token refreshed successfully
   *       401:
   *         description: Invalid token
   */
  refresh = asyncHandler(async (req, res) => {
    const newToken = this.authService.refreshToken(req.user);

    return ApiResponse.success(res, {
      token: newToken,
      user: req.user
    }, 'Token refreshed successfully');
  });
}

module.exports = AuthController;