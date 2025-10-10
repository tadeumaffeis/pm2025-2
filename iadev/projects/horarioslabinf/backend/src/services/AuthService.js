const jwt = require('jsonwebtoken');
const LogService = require('./LogService');

class AuthService {
  constructor() {
    this.logService = new LogService();
  }

  async login(username, password, req = null) {
    // Validação simples para demo
    const validUsers = {
      admin: { password: 'admin123', role: 'admin', id: 1 },
      user: { password: 'user123', role: 'user', id: 2 }
    };

    const user = validUsers[username];
    if (!user || user.password !== password) {
      await this.logService.log('LOGIN_FAILED', 'AUTH', username, 'anonymous', { username }, req);
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { 
        id: user.id,
        username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    await this.logService.log('LOGIN', 'AUTH', user.id, user.id, { username }, req);

    return {
      token,
      user: {
        id: user.id,
        username,
        role: user.role
      }
    };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  refreshToken(userData) {
    return jwt.sign(
      {
        id: userData.id,
        username: userData.username,
        role: userData.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }
}

module.exports = AuthService;