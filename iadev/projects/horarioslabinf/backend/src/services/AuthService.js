const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const LogService = require('./LogService');
const UsuarioRepository = require('../repositories/UsuarioRepository');

class AuthService {
  constructor() {
    this.logService = new LogService();
    this.usuarioRepository = new UsuarioRepository();
  }

  async login(username, password, req = null) {
    try {
      // Fallback para usuários hardcoded se banco não estiver disponível
      let user;
      try {
        user = await this.usuarioRepository.findByUsername(username);
      } catch (dbError) {
        console.log('Database not available, using fallback users');
        const fallbackUsers = {
          admin: { id_usuario: 1, username: 'admin', password_hash: '$2a$10$Ziq2Gzg56zD3Hn18X7MhJugVddNk3CzUXA/3kRGPj1WWcAD5eFDrC', role: 'admin' },
          user: { id_usuario: 2, username: 'user', password_hash: '$2a$10$DlwHy8ZRJWV.Vc2vII/tVef.7CFXZnJMtUmyZCo924DJ4ZCBFTFpS', role: 'user' }
        };
        user = fallbackUsers[username];
      }
      
      if (!user) {
        await this.logService.log('LOGIN_FAILED', 'AUTH', username, 'anonymous', { username, reason: 'user_not_found' }, req);
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      
      if (!isValidPassword) {
        await this.logService.log('LOGIN_FAILED', 'AUTH', user.id_usuario, 'anonymous', { username, reason: 'invalid_password' }, req);
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { 
          id: user.id_usuario,
          username: user.username,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      await this.logService.log('LOGIN', 'AUTH', user.id_usuario, user.id_usuario, { username }, req);

      return {
        token,
        user: {
          id: user.id_usuario,
          username: user.username,
          role: user.role
        }
      };
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        throw error;
      }
      console.error('Auth service error:', error);
      await this.logService.log('LOGIN_ERROR', 'AUTH', username, 'anonymous', { username, error: error.message }, req);
      throw new Error('Authentication service error');
    }
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

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async createUser(userData) {
    const { username, password, role } = userData;
    const hashedPassword = await this.hashPassword(password);
    
    return await this.usuarioRepository.create({
      username,
      password_hash: hashedPassword,
      role
    });
  }
}

module.exports = AuthService;