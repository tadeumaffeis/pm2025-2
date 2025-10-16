// Para emulador Android use: 10.0.2.2
// Para dispositivo físico use seu IP local: 192.168.x.x
// Para iOS Simulator use: localhost
const API_BASE_URL = __DEV__ 
  ? 'http://10.0.2.2:3000/api'  // Android Emulator
  : 'http://192.168.1.100:3000/api'; // Dispositivo físico

export const cursosService = {
  async getAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/cursos`);
      if (!response.ok) {
        throw new Error('Erro ao buscar cursos');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  async create(curso) {
    try {
      const response = await fetch(`${API_BASE_URL}/cursos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(curso),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar curso');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  async update(sigla, curso) {
    try {
      const response = await fetch(`${API_BASE_URL}/cursos/${sigla}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(curso),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar curso');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  async delete(sigla) {
    try {
      const response = await fetch(`${API_BASE_URL}/cursos/${sigla}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar curso');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }
};