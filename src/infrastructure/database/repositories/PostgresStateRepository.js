// src/infrastructure/database/repositories/PostgresStateRepository.js

// Importamos el "contrato" (la interfaz)
const IStateRepository = require('../../../domain/repositories/IStateRepository');

// Importamos nuestra instancia única de Prisma
const prisma = require('../PrismaClient');

/**
 * Esta es la implementación "concreta" del repositorio de Estados
 * usando PostgreSQL y Prisma.
 */
class PostgresStateRepository extends IStateRepository {

  /**
   * Implementamos el método findPaginated que define el contrato
   * @param {object} paginationOptions
   * @param {number} paginationOptions.page
   * @param {number} paginationOptions.limit
   */
  async findPaginated({ page, limit }) {

    // 1. Convertimos a número y calculamos 'skip' y 'take'
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    // 2. Obtenemos el conteo total de items (para calcular total de páginas)
    const totalItems = await prisma.state.count();

    // 3. Obtenemos los datos de la página solicitada
    const data = await prisma.state.findMany({
      take: take, // Tomar 'limit' items
      skip: skip, // Saltar 'skip' items
      orderBy: {  // Es importante ordenar para que la paginación sea consistente
        name: 'asc' 
      }
    });

    // 4. Calculamos el total de páginas
    const totalPages = Math.ceil(totalItems / take);

    // 5. Devolvemos el objeto de respuesta de paginación
    return {
      data: data,
      totalItems: totalItems,
      totalPages: totalPages,
      currentPage: Number(page)
    };
  }
}

module.exports = PostgresStateRepository;