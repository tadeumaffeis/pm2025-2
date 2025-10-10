const Joi = require('joi');

const createCursoSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Nome is required',
    'string.min': 'Nome must be at least 2 characters',
    'string.max': 'Nome must not exceed 100 characters'
  })
});

const updateCursoSchema = Joi.object({
  nome: Joi.string().min(2).max(100).messages({
    'string.min': 'Nome must be at least 2 characters',
    'string.max': 'Nome must not exceed 100 characters'
  })
});

const validateCreateCurso = (req, res, next) => {
  const { error } = createCursoSchema.validate(req.body, { allowUnknown: true, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateUpdateCurso = (req, res, next) => {
  const { error } = updateCursoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

module.exports = {
  validateCreateCurso,
  validateUpdateCurso
};