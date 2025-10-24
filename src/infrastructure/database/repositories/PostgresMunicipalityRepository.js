// src/infrastructure/database/repositories/PostgresMunicipalityRepository.js

const IMunicipalityRepository = require('../../../domain/repositories/IMunicipalityRepository');
const prisma = require('../PrismaClient');

class PostgresMunicipalityRepository extends IMunicipalityRepository {

  /**
   * Implementamos el método findPaginatedByStateId
   * @param {object} options
   * @param {number} options.stateId
   * @param {number} options.page
   * @param {number} options.limit
   */
  async findPaginatedByStateId({ stateId, page, limit }) {

    // 1. Convertimos a número y calculamos 'skip' y 'take'
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;
    const idEstado = Number(stateId); // Aseguramos que el ID del estado sea un número

    // 2. Definimos el filtro (where clause)
    const whereClause = {
      state_id: idEstado
    };

    // 3. Obtenemos el conteo total DE ESE ESTADO
    const totalItems = await prisma.municipality.count({
      where: whereClause // Aplicamos el filtro
    });

    // 4. Obtenemos los datos de la página solicitada
    const data = await prisma.municipality.findMany({
      where: whereClause, // Aplicamos el filtro
      take: take,
      skip: skip,
      orderBy: {
        name: 'asc'
      }
    });

    // 5. Calculamos el total de páginas
    const totalPages = Math.ceil(totalItems / take);

    // 6. Devolvemos el objeto de respuesta
    return {
      data: data,
      totalItems: totalItems,
      totalPages: totalPages,
      currentPage: Number(page)
    };
  }
}

module.exports = PostgresMunicipalityRepository;