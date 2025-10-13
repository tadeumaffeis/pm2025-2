const Usuario = require('../models/mysql/Usuario');

class UsuarioRepository {
  constructor() {
    this.usuarioModel = new Usuario();
  }

  async findByUsername(username) {
    return await this.usuarioModel.findByUsername(username);
  }

  async create(userData) {
    return await this.usuarioModel.create(userData);
  }

  async findById(id) {
    return await this.usuarioModel.findById(id);
  }
}

module.exports = UsuarioRepository;