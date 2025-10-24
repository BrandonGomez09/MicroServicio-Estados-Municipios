class GetMunicipalitiesByStateUseCase {
  /**
   * @param {IMunicipalityRepository} municipalityRepository
   */
  constructor(municipalityRepository) {
    this.municipalityRepository = municipalityRepository;
  }

  /**
   * Ejecuta el caso de uso.
   * @param {object} options
   * @param {number} options.stateId - El ID del estado.
   * @param {number} options.page - El número de página.
   * @param {number} options.limit - El número de items por página.
   */
  async execute({ stateId, page, limit }) {
    // 1. Validar el stateId
    if (!stateId || isNaN(Number(stateId))) {
      throw new Error('El ID del estado es inválido.');
    }

    // 2. Pedir al repositorio los datos paginados
    const paginatedResult = await this.municipalityRepository.findPaginatedByStateId({
      stateId,
      page,
      limit
    });

    return paginatedResult;
  }
}

module.exports = GetMunicipalitiesByStateUseCase;