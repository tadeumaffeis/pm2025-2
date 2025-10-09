const jwt = require('jsonwebtoken');
const config = require('../config');
const { AppError } = require('../utils/errors');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError('Access token required', 401));
  }

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) {
      return next(new AppError('Invalid or expired token', 403));
    }
    req.user = user;
    next();
  });
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorize,
};