import { Municipality } from "@domain/entities/Municipality";
import { IMunicipalityRepository } from "@domain/repositories/IMunicipalityRepository";
import { PaginatedResponse } from "@domain/types/PaginatedResponse";

export class GetMunicipalitiesByStateUseCase {
  
  constructor(private readonly municipalityRepository: IMunicipalityRepository) {}
  async execute(options: { stateId: number; page: number; limit: number }): Promise<PaginatedResponse<Municipality>> {
    
    const stateId = options.stateId;
    const page = options.page < 1 ? 1 : options.page;
    const limit = options.limit < 1 ? 10 : options.limit;

    if (!stateId || stateId < 1) {
      throw new Error("ID de estado inválido");
    }

    return this.municipalityRepository.findPaginatedByStateId({ stateId, page, limit });
  }
}