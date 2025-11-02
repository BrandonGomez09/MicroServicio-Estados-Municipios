import { IMunicipalityRepository } from "@domain/repositories/IMunicipalityRepository";
import { Municipality } from "@domain/entities/Municipality";
import { PaginatedResponse } from "@domain/types/PaginatedResponse";
import { AppDataSource } from "@config/data-source";
import { MunicipalityEntity } from "@infrastructure/database/entities/MunicipalityEntity";

export class TypeORMMunicipalityRepository implements IMunicipalityRepository {

  private municipalityRepo = AppDataSource.getRepository(MunicipalityEntity);

  async findPaginatedByStateId({ stateId, page, limit }: { stateId: number; page: number; limit: number; }): Promise<PaginatedResponse<Municipality>> {
    
    const take = limit;
    const skip = (page - 1) * take;
    const whereClause = { state_id: stateId };

    // Ejecutamos 'findAndCount' con la condición 'where'
    const [entities, totalItems] = await this.municipalityRepo.findAndCount({
      where: whereClause,
      take: take,
      skip: skip,
      order: {
        name: 'ASC' // Ordenamos por nombre
      }
    });

    const totalPages = Math.ceil(totalItems / take);
    const data: Municipality[] = entities;

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }
}
