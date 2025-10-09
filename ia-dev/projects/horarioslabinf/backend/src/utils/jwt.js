const jwt = require('jsonwebtoken');

class JWTUtil {
  static generateToken(payload, expiresIn = process.env.JWT_EXPIRES_IN || '24h') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { 
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' 
    });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }

  static getTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
}

module.exports = JWTUtil;