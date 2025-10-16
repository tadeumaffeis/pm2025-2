const { Curso } = require('../models');

const cursoController = {
  // GET /cursos
  getAll: async (req, res) => {
    try {
      const cursos = await Curso.findAll({ order: [['sigla', 'ASC']] });
      res.json(cursos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /cursos/:sigla
  getById: async (req, res) => {
    try {
      const { sigla } = req.params;
      const curso = await Curso.findByPk(sigla);
      
      if (!curso) {
        return res.status(404).json({ error: 'Curso não encontrado' });
      }
      
      res.json(curso);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /cursos
  create: async (req, res) => {
    try {
      const { sigla, nome, email } = req.body;
      const curso = await Curso.create({ sigla, nome, email });
      res.status(201).json(curso);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: 'Sigla já existe' });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  },

  // PUT /cursos/:sigla
  update: async (req, res) => {
    try {
      const { sigla } = req.params;
      const { nome, email } = req.body;
      
      const curso = await Curso.findByPk(sigla);
      if (!curso) {
        return res.status(404).json({ error: 'Curso não encontrado' });
      }
      
      const updateData = {};
      if (nome !== null && nome !== undefined) updateData.nome = nome;
      if (email !== null && email !== undefined) updateData.email = email;
      
      if (Object.keys(updateData).length > 0) {
        await curso.update(updateData);
      }
      
      res.json(curso);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /cursos/:sigla
  delete: async (req, res) => {
    try {
      const { sigla } = req.params;
      const deleted = await Curso.destroy({ where: { sigla } });
      
      if (deleted === 0) {
        return res.status(404).json({ error: 'Curso não encontrado' });
      }
      
      res.json({ message: 'Curso deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = cursoController;