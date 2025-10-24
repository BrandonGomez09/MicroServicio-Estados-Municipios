class StateController {
  /**
   * @param {GetAllStatesUseCase} getAllStatesUseCase
   * @param {GetMunicipalitiesByStateUseCase} getMunicipalitiesByStateUseCase
   */
  constructor(getAllStatesUseCase, getMunicipalitiesByStateUseCase) {
    this.getAllStatesUseCase = getAllStatesUseCase;
    this.getMunicipalitiesByStateUseCase = getMunicipalitiesByStateUseCase;

    this.getAll = this.getAll.bind(this);
    this.getMunicipalitiesByState = this.getMunicipalitiesByState.bind(this);
  }

  /**
   * Maneja la petición GET /api/states
   */
  async getAll(req, res) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;

      const paginatedResult = await this.getAllStatesUseCase.execute({ page, limit });

      res.status(200).json(paginatedResult);

    } catch (error) {
      console.error('Error al obtener estados:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  /**
   * Maneja la petición GET /api/states/:id/municipalities
   */
  async getMunicipalitiesByState(req, res) {
    try {
      // Obtenemos el ID del estado desde los parámetros de la URL
      const { id } = req.params; 

      // --- NUEVA LÓGICA DE PAGINACIÓN ---
      const page = req.query.page || 1;
      const limit = req.query.limit || 10; // Por defecto, 10 municipios por página

      // Llamamos al Caso de Uso con TODOS los parámetros
      const paginatedResult = await this.getMunicipalitiesByStateUseCase.execute({
        stateId: id,
        page: page,
        limit: limit
      });

      // Devolvemos los municipios paginados
      res.status(200).json(paginatedResult);

    } catch (error) {
      console.error(`Error al obtener municipios para el estado ${req.params.id}:`, error);
      if (error.message.includes('inválido')) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    }
  }
}

module.exports = StateController;