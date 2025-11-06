import { IStateRepository } from "@domain/repositories/IStateRepository";
import { State } from "@domain/entities/State";
import { PaginatedResponse } from "@domain/types/PaginatedResponse";
import { AppDataSource } from "@config/data-source";
import { StateEntity } from "@infrastructure/database/entities/StateEntity";

export class TypeORMStateRepository implements IStateRepository {
  
  // Obtenemos el repositorio de TypeORM para la entidad StateEntity
  private stateRepo = AppDataSource.getRepository(StateEntity);

  async findPaginated({ page, limit }: { page: number; limit: number; }): Promise<PaginatedResponse<State>> {
    
    // 1. Calcular 'skip' (cuántos saltar) y 'take' (cuántos tomar)
    const take = limit;
    const skip = (page - 1) * take;

    // 2. Ejecutar ambas consultas (conteo y datos) en paralelo
    const [entities, totalItems] = await this.stateRepo.findAndCount({
      take: take,
      skip: skip,
      order: {
        id: 'ASC' // Ordenamos por ID para paginación consistente
      }
    });

    // 3. Calcular el total de páginas
    const totalPages = Math.ceil(totalItems / take);

    // 4. Mapear de StateEntity a la interfaz State
    // (En este caso, son idénticos, por lo que la asignación es directa)
    const data: State[] = entities;

    // 5. Devolver la respuesta paginada
    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async findById(id: number): Promise<State | null> {
    // findOne es la forma de TypeORM de buscar por ID u otra condición única
    const entity = await this.stateRepo.findOne({
      where: { id: id }
    });

    return entity; // Devuelve la entidad o 'null' si no se encuentra
  }
}