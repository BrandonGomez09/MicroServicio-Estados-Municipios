// src/domain/repositories/IStateRepository.js

class IStateRepository {
  /**
   * Busca todos los estados de forma paginada.
   * @param {object} paginationOptions - Opciones de paginación.
   * @param {number} paginationOptions.page - El número de página (ej: 1).
   * @param {number} paginationOptions.limit - El número de items por página (ej: 10).
   * @returns {Promise<object>} Un objeto que contendrá los datos y el total.
   */
  async findPaginated({ page, limit }) {
    throw new Error('MÉTODO NO IMPLEMENTADO: findPaginated');
  }
}

module.exports = IStateRepository;