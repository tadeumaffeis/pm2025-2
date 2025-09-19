const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Curso = sequelize.define('Curso', {
  sigla: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'cursos',
  timestamps: false
});

module.exports = Curso;