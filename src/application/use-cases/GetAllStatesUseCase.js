class GetAllStatesUseCase {
  /**
   * @param {IStateRepository} stateRepository
   */
  constructor(stateRepository) {
    this.stateRepository = stateRepository;
  }

  /**
   * El método "execute" ahora recibe los parámetros de paginación
   * @param {object} paginationOptions
   * @param {number} paginationOptions.page
   * @param {number} paginationOptions.limit
   */
  async execute({ page, limit }) {
    // Simplemente le pide al repositorio los estados paginados
    // La lógica de 'skip' y 'take' ya la maneja el repositorio
    const paginatedResult = await this.stateRepository.findPaginated({ page, limit });

    return paginatedResult;
  }
}

module.exports = GetAllStatesUseCase;