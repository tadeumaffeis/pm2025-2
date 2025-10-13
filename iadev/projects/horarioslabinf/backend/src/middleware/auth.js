const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/response');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.error(res, 'Access token required', 401);
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return ApiResponse.error(res, 'Token expired', 401);
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ApiResponse.error(res, 'Token expired', 401);
    }
    if (error.name === 'JsonWebTokenError') {
      return ApiResponse.error(res, 'Invalid token', 401);
    }
    return ApiResponse.error(res, 'Token verification failed', 401);
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(res, 'Authentication required', 401);
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(res, 'Insufficient permissions', 403);
    }

    next();
  };
};

module.exports = { auth, requireRole };