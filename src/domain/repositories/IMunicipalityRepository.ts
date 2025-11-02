import { Municipality } from "@domain/entities/Municipality";
import { PaginatedResponse } from "@domain/types/PaginatedResponse";

export interface IMunicipalityRepository {
  findPaginatedByStateId(options: {
    stateId: number;
    page: number;
    limit: number;
  }): Promise<PaginatedResponse<Municipality>>;
}
