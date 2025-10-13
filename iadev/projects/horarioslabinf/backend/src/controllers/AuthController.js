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
   *     summary: User authentication
   *     description: Authenticate user with username and password, returns JWT token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 minLength: 3
   *                 maxLength: 50
   *                 example: admin
   *               password:
   *                 type: string
   *                 minLength: 6
   *                 example: admin123
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Login successful
   *                 data:
   *                   type: object
   *                   properties:
   *                     token:
   *                       type: string
   *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *                     user:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: integer
   *                         username:
   *                           type: string
   *                         role:
   *                           type: string
   *                           enum: [admin, user]
   *       400:
   *         description: Validation error
   *       401:
   *         description: Invalid credentials
   *       500:
   *         description: Authentication service error
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
   *     summary: Verify JWT token
   *     description: Verify if the provided JWT token is valid and not expired
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Token is valid
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Token is valid
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     username:
   *                       type: string
   *                     role:
   *                       type: string
   *       401:
   *         description: Invalid or expired token
   */
  verify = asyncHandler(async (req, res) => {
    return ApiResponse.success(res, req.user, 'Token is valid');
  });

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     summary: Refresh JWT token
   *     description: Generate a new JWT token using the current valid token
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Token refreshed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Token refreshed successfully
   *                 data:
   *                   type: object
   *                   properties:
   *                     token:
   *                       type: string
   *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *                     user:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: integer
   *                         username:
   *                           type: string
   *                         role:
   *                           type: string
   *       401:
   *         description: Invalid or expired token
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