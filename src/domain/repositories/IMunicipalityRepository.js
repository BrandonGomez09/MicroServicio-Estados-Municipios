// src/domain/repositories/IMunicipalityRepository.js

class IMunicipalityRepository {
  /**
   * Busca todos los municipios de un estado, de forma paginada.
   * @param {object} options - Opciones de búsqueda y paginación.
   * @param {number} options.stateId - El ID del estado.
   * @param {number} options.page - El número de página.
   * @param {number} options.limit - El número de items por página.
   * @returns {Promise<object>} Un objeto que contendrá los datos y el total.
   */
  async findPaginatedByStateId({ stateId, page, limit }) {
    throw new Error('MÉTODO NO IMPLEMENTADO: findPaginatedByStateId');
  }
}

module.exports = IMunicipalityRepository;